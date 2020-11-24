import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Comunicación F Y B
import { Travel } from '../models/travel'; // Modelo con la estructura de nuestra tarea

@Injectable({providedIn: 'root'})

export class TravelService {
// Aqui agregamos todos los ervicios que se van a consumir desde nuestra API REST
  selectedTravel: Travel; // Esto guarda toda la info de la tarea que seleccionemos
  travel: Travel[];
  premium: Travel[];
  cheap: Travel[];
  archived: Travel[];
  deleted: Travel[];
  readonly URL_API = "http://localhost:3000/api/travels"; // Url de nuestra API REST

  constructor(private http: HttpClient) { // Nos ayuda a comunicar back con front
    this.selectedTravel = new Travel(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }

  getTravels() // Hace una petición get para obtener las tareas de esa url
  {
    return this.http.get(this.URL_API);
  }

  getPremiumTravels() // Hace una petición get para obtener las tareas de esa url
  {
    return this.http.get(this.URL_API + '/premium');
  }

  getCheapTravels() // Hace una petición get para obtener las tareas de esa url
  {
    return this.http.get(this.URL_API + '/cheap');
  }

  getArchivedTravels() // Hace una petición get para obtener las tareas de esa url
  {
    return this.http.get(this.URL_API + '/archived');
  }

  getDeletedTravels() // Hace una petición get para obtener las tareas de esa url
  {
    return this.http.get(this.URL_API + '/deleted');
  }

  postTravel(travel: Travel) // Generar una nueva tarea
  {
    return this.http.post(this.URL_API, travel);
  }

  putTravel(travel: Travel) // Actualizar tarea
  {
    return this.http.put(this.URL_API + '/' + travel._id, travel);
  }

  putStatusTravel(travel: Travel) // Archivar la tarea -> actualizarle el estado
  {
      return this.http.put(this.URL_API + '/' + travel._id + '/' + 'status', travel);
  }

  softDeleteTravel(travel: Travel) // Actualizar estado de la tarea(SoftDelete)
  {
      return this.http.put(this.URL_API + '/' + travel._id + '/' + 'softdelete', travel);
  }

  deleteTravel(_id: string) // Eliminar tarea
  {
    return this.http.delete(this.URL_API + '/' + _id)
  }
}
