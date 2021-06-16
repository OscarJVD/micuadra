import { Injectable } from '@angular/core';
//import {Http,Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Comunicación F Y B
//import {Http,Headers} from '@angular/http';

import { Quadrangular } from '../models/quadrangular'; // Modelo con la estructura de nuestra tarea

@Injectable({providedIn: 'root'})

export class QuadrangularService {
// Aqui agregamos todos los ervicios que se van a consumir desde nuestra API REST
  selectedQuadrangular: Quadrangular; // Esto guarda toda la info de la tarea que seleccionemos
  //headers: any[];
  leagues: Quadrangular[];
  quadrangular: Quadrangular[];
  archived: Quadrangular[];
  deleted: Quadrangular[];

  readonly URL_API = "http://localhost:3000/api/quadrangulars"; // Url de nuestra API REST
  readonly URL_SOCCER_API = "https://api.football-data.org/v2/competitions/SA/scorers"; // Url de nuestra API REST

  constructor(private http: HttpClient) { // Nos ayuda a comunicar back con front
    this.selectedQuadrangular = new Quadrangular(); // iNICIALIZANDO VARIABLE CON UNA TAREA
   // this.headers = new Headers();
  }

  getQuadrangulars() // Hace una petición get para obtener las cuadrangulares de esa url
  {
    return this.http.get(this.URL_API);
  }

  getLeagues()
  // : Promise<any> // Hace una petición get para obtener las cuadrangulares de esa url
  {
    /*let headers = new Headers({ 'X-Auth-Token': '55dda2ea064c48909e7c2054959cd00b' });
    let options = new RequestOptions({ headers: headers });
*/


/*
    return this.http.get(this.URL_SOCCER_API, {
    headers: new HttpHeaders({
      'X-Auth-Token': '55dda2ea064c48909e7c2054959cd00b',
      'Content-Type': 'application/json',
    })};*/

    //'Content-Type': 'application/json',
    /*return this.http.get(this.URL_SOCCER_API, {
      headers: new HttpHeaders({
      'X-Auth-Token': '55dda2ea064c48909e7c2054959cd00b',
      'Content-Type': 'application/json',
    })})*/
/*
    const options = {
      headers: new HttpHeaders().append('X-Auth-Token', '55dda2ea064c48909e7c2054959cd00b')
    }

    return this.http.get(this.URL_SOCCER_API, options)
    //params: new HttpParams().append('key', 'value')

    /*return this.http.get(this.URL_SOCCER_API,
      new RequestOptions({headers: {'X-Auth-Token': 'YOUR_API_TOKEN'}}));
*/
    //, responseType: 'json'
    //headers: { 'X-Auth-Token': 'YOUR_API_TOKEN' }
    /*return this.http.get(this.URL_SOCCER_API, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': '55dda2ea064c48909e7c2054959cd00b'
    }), responseType: 'json'});*/

    /*$http.defaults.headers.common['Auth-Token'] = '<INSERT AUTH TOKEN HERE>';
    return $http.get('http://api.football-data.org/fixtures?callback=JSON_CALLBACK');
    */

  //   let headers = new HttpHeaders({
  //     'X-Auth-Token': '55dda2ea064c48909e7c2054959cd00b',
  //     'Content-Type': 'application/json'
  //  });

  //  let options = {
  //     headers: headers
  //  }

  // return this.http.get(this.URL_SOCCER_API, options);
  // const options = new HttpHeaders();
  //   return this.http
  //     .get<any>('https://api.football-data.org/v2/competitions/CL/matches', {
  //       headers: {
  //         'X-Auth-Token':
  //         '55dda2ea064c48909e7c2054959cd00b'
  //       }
  //     })
  //     .toPromise();

      let header = new HttpHeaders()
        .set('X-Auth-Token','55dda2ea064c48909e7c2054959cd00b')

      return this.http.get("https://api.football-data.org/v2/competitions/SA/scorers", {
        headers: header
      })
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
