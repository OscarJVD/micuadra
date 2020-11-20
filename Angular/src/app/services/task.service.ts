import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Comunicación F Y B
import { Task } from '../models/task'; // Modelo con la estructura de nuestra tarea

@Injectable({providedIn: 'root'})

export class TaskService {
// Aqui agregamos todos los ervicios que se van a consumir desde nuestra API REST
  selectedTask: Task; // Esto guarda toda la info de la tarea que seleccionemos
  task: Task[];
  readonly URL_API = "http://localhost:3000/api/tasks"; // Url de nuestra API REST

  constructor(private http: HttpClient) { // Nos ayuda a comunicar back con front
    this.selectedTask = new Task(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }

  getTasks() // Hace una petición get para obtener las tareas de esa url
  {
    return this.http.get(this.URL_API);
  }

  postTask(task: Task) // Generar una nueva tarea
  {
    return this.http.post(this.URL_API, task);
  }

  putTask(task: Task) // Actualizar tarea
  {
    return this.http.put(this.URL_API + '/' + task._id, task);
  }

  putStatusTask(task: Task) // Actualizar estado de la tarea(SoftDelete)
  {
    return this.http.put(this.URL_API + '/' + task._id + '/status', task);
  }

  deleteTask(_id: string) // Eliminar tarea
  {
    return this.http.delete(this.URL_API + '/' + _id)
  }
}
