import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req, next){
    // alert(this.authService.getToken())
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })
    // console.log(tokenizeReq);
    // alert(tokenizeReq);
    // if(tokenizeReq){
    //   alert("Errrororor")
      return next.handle(tokenizeReq)
    // }else{
    //   alert("ERROR MIO")
    //   return "error email del carajo"
    // }
  }
}
