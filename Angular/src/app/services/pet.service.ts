import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; // Comunicación F Y B
import { Pet } from '../models/pet'; // Modelo con la estructura de nuestra tarea

@Injectable({providedIn: 'root'})

export class PetService {
  // Aqui agregamos todos los ervicios que se van a consumir desde nuestra API REST
  selectedPet: Pet; // Esto guarda toda la info de la mascota que seleccionemos
  pet: Pet[];
  archived: Pet[];
  deleted: Pet[];
  readonly URL_API = "http://localhost:3000/api/pets"; // Url de nuestra API REST

  constructor(private http: HttpClient) { // Nos ayuda a comunicar back con front
    this.selectedPet = new Pet(); // iNICIALIZANDO VARIABLE CON UNA mascota
  }

  getPets() // Hace una petición get para obtener las mascotas de esa url
  {
    return this.http.get(this.URL_API);
  }

  getArchivedPets() // Hace una petición get para obtener las mascotas de esa url
  {
    return this.http.get(this.URL_API + '/archived');
  }

  getDeletedPets() // Hace una petición get para obtener las mascotas de esa url
  {
    return this.http.get(this.URL_API + '/deleted');
  }

  postPet(pet: Pet) // Generar una nueva mascota
  {
    return this.http.post<any>(this.URL_API, pet);
  }

  putPet(pet: Pet) // Actualizar mascota
  {
    return this.http.put(this.URL_API + '/' + pet._id, pet);
  }

  putStatusPet(pet: Pet) // Archivar la mascota -> actualizarle el estado
  {
      return this.http.put(this.URL_API + '/' + pet._id + '/' + 'status', pet);
  }

  softDeletePet(pet: Pet) // Actualizar estado de la mascota(SoftDelete)
  {
      return this.http.put(this.URL_API + '/' + pet._id + '/' + 'softdelete', pet);
  }

  deletePet(_id: string) // Eliminar mascota
  {
    return this.http.delete(this.URL_API + '/' + _id)
  }
}
