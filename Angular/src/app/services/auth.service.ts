import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthService {

  private URL = "http://localhost:3000/api/login";

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user){ // retorna token y aja
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signIn(user){ // retorna token y aja
    return this.http.post<any>(this.URL + '/signin', user); // El any significa que puede recibir cualquier tipo de dato
  }

  loggedIn()
  { // regresar el token
    return !!localStorage.getItem('token');
  }

  getToken()
  { // regresar el token
    return localStorage.getItem('token');
  }

  logOut()
  { // regresar el token
    localStorage.removeItem('token');
    // localStorage.removeItem('sessionUserId');
    this.router.navigate(['/signin'])
  }
}
