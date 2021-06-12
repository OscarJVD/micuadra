import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var M:any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    email: '',
    password: '',
    name: '',
    authMethod: 'userpassword',
    idAuth: 'null',
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void { // Si hay token redireccionamos al home, con eso evitamos que vuelva al login por url
    if(localStorage.getItem('token')){ // CONSULTAMOS EL LOCALSTORAGE
      this.router.navigate(['/home']);
    }
  }

  signIn(){
    if(Object.keys(this.user).length !== 0 && this.user.email != '' && this.user.password != ''){
      this.authService.signIn(this.user).subscribe(res => {
        console.log(res.sessionUserId);
        console.log(res);

        localStorage.setItem('token', res.token)
        localStorage.setItem('sessionUserId', res.sessionUserId)
        this.router.navigate(['/home'])
      },
      e => M.toast({html: e.error}))
    }else M.toast({html: 'Los campos no pueden estar vacios'})

  }

  back(){
    location.href = "/travelspg";
  }

}
