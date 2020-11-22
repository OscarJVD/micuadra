// Aqui validamos que no se pueda entrar al SI por url
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Solo inicializamos
  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/signin']);
      return false;
    }
  }

}
