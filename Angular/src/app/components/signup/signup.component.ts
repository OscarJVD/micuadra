import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var M:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: '',
    name: '',
    authMethod: 'userpassword',
    idAuth: 'null',
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
  }

  checkExist(){

    if(Object.keys(this.user).length !== 0
    && this.user.email != ''
    && this.user.password != ''
    && this.user.name != '')
    {
      this.authService.signIn(this.user).subscribe(res => {
        console.log(res);
        console.log(res.sessionUserId);

        localStorage.setItem('token', res.token)
        localStorage.setItem('sessionUserId', res.sessionUserId)
        this.router.navigate(['/home'])
      },
      e => {
        if(e.status == 404) this.signUp(); // En el controlador manda el 404 segun el caso de que no exista el usu
        if(e.status == 401) return M.toast({ html: "El correo que ingresaste ya existe" })
      })
    }else M.toast({html: 'Los campos no pueden estar vacios'})

  }

  signUp()
  {
    this.authService.signUp(this.user).subscribe(
      res => {
            if(res.length != 0){
              if(res.token){
                console.log(res);
                console.log(res.sessionUserId);
                localStorage.setItem('token', res.token);
                localStorage.setItem('sessionUserId', res.sessionUserId)
                this.router.navigate(['/home']); // redirecciona al home
              }
            }
      },
      e => M.toast({ html: e.error })
    )
  }
}
