import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Comunicación F Y B
import { Quadrangular } from '../models/quadrangular'; // Modelo con la estructura de nuestra tarea

@Injectable({providedIn: 'root'})

export class QuadrangularService {
// Aqui agregamos todos los ervicios que se van a consumir desde nuestra API REST
  selectedQuadrangular: Quadrangular; // Esto guarda toda la info de la tarea que seleccionemos
  quadrangular: Quadrangular[];
  archived: Quadrangular[];
  deleted: Quadrangular[];

  readonly URL_API = "http://localhost:3000/api/quadrangulars"; // Url de nuestra API REST

  constructor(private http: HttpClient) { // Nos ayuda a comunicar back con front
    this.selectedQuadrangular = new Quadrangular(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }

  getQuadrangulars() // Hace una petición get para obtener las cuadrangulares de esa url
  {
    return this.http.get(this.URL_API);
  }

  getArchivedQuadrangulars() // Hace una petición get para obtener las cuadrangulares de esa url
  {
    return this.http.get(this.URL_API + '/archived');
  }

  getDeletedQuadrangulars() // Hace una petición get para obtener las cuadrangulares de esa url
  {
    return this.http.get(this.URL_API + '/deleted');
  }

  postQuadrangular(quadrangular: Quadrangular) // Generar una nueva tarea
  {
    return this.http.post(this.URL_API, quadrangular);
  }

  putQuadrangular(quadrangular: Quadrangular) // Actualizar tarea
  {
    return this.http.put(this.URL_API + '/' + quadrangular._id, quadrangular);
  }

  putStatusQuadrangular(quadrangular: Quadrangular) // Archivar la tarea -> actualizarle el estado
  {
      return this.http.put(this.URL_API + '/' + quadrangular._id + '/' + 'status', quadrangular);
  }

  softDeleteQuadrangular(quadrangular: Quadrangular) // Actualizar estado de la tarea(SoftDelete)
  {
      return this.http.put(this.URL_API + '/' + quadrangular._id + '/' + 'softdelete', quadrangular);
  }

  deleteQuadrangular(_id: string) // Eliminar tarea
  {
    return this.http.delete(this.URL_API + '/' + _id)
  }
}
