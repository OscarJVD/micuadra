import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Comunicación F Y B
// import { Travelpg } from '../models/travelpg'; // Modelo con la estructura de nuestra viaje
import { Travel } from '../models/travel'; // Modelo con la estructura de nuestra tarea

@Injectable({
  providedIn: 'root'
})
export class TravelpgpgService {

  // selectedTravelpg: Travelpg; // Esto guarda toda la info de la viaje que seleccionemos
  // travelpg: Travelpg[];
  // archived: Travelpg[];
  // deleted: Travelpg[];

  selectedTravel: Travel; // Esto guarda toda la info de la tarea que seleccionemos
  travel: Travel[];
  readonly URL_API = "http://localhost:3000/api/travels"; // Url de nuestra API REST

  constructor(private http: HttpClient) { // Nos ayuda a comunicar back con front
    // this.selectedTravelpg = new Travelpg(); // iNICIALIZANDO VARIABLE CON UNA viaje
    this.selectedTravel = new Travel(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }

  getTravelpgs() // Hace una petición get para obtener las viajes de esa url
  {
    return this.http.get(this.URL_API);
  }
}
