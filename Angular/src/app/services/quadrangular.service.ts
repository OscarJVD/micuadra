import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http'; // Comunicación F Y B
import { Quadrangular } from '../models/quadrangular'; // Modelo con la estructura de nuestra tarea

@Injectable({providedIn: 'root'})

export class QuadrangularService {
// Aqui agregamos todos los ervicios que se van a consumir desde nuestra API REST
  selectedQuadrangular: Quadrangular; // Esto guarda toda la info de la tarea que seleccionemos
  //headers: any[];
  //leagues: Quadrangular[];
  //leagues: [];
  //leagues: {};
  // public leagues : any;
  public leagues : any = [];
  // public leagues : any = {};
  quadrangular: Quadrangular[];
  archived: Quadrangular[];
  deleted: Quadrangular[];

  readonly URL_API = "http://localhost:3000/api/quadrangulars"; // Url de nuestra API REST
  // readonly URL_SOCCER_API = "https://api.football-data.org/v2/competitions/SA/scorers"; // Url de nuestra API REST
 // URL_SOCCER_API: string = ""; // Url de nuestra API REST

  constructor(private http: HttpClient, private handler: HttpBackend) { // Nos ayuda a comunicar back con front
    this.http = new HttpClient(handler)
    this.selectedQuadrangular = new Quadrangular(); // iNICIALIZANDO VARIABLE CON UNA TAREA
   // this.headers = new Headers();
   //this.URL_SOCCER_API = "https://api.football-data.org/v2/competitions/SA/scorers"
  }

  getQuadrangulars() // Hace una petición get para obtener las cuadrangulares de esa url
  {
    return this.http.get(this.URL_API);
  }

  // async
  getLeagues()
  // : Promise<any> // Hace una petición get para obtener las cuadrangulares de esa url
  {
    try{
      const headersOpt = new HttpHeaders().set(
        'X-Auth-Token',
        '55dda2ea064c48909e7c2054959cd00b'
      )

      headersOpt.delete('Authorization')

      // const data = await this.http.get<any>('https://api.football-data.org/v2/competitions', {
        // const data = this.http.get('https://api.football-data.org/v2/competitions', {
          return this.http.get('https://api.football-data.org/v2/competitions',{headers: headersOpt})
      // .toPromise();

      // console.log(data)
      // return data
    }catch(err){console.log(err)}
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
