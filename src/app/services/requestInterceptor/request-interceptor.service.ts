import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { BaseService } from '../../services/base/base.service';
import { RedirectService } from '../../services/redirect/redirect.service';
import { Ilogin } from '../../interfaces/Ilogin/ilogin';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor  {

  token: string;
  coreURL;

  constructor(private baseService: BaseService, private redirectService: RedirectService, private router: Router) {
    this.token = this.baseService.getUserToke();
    this.coreURL = environment.coreURL;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders();
     
    if(req.url.match("file/UploadFile")){
      headers = headers.append('Authorization', `${this.token}`);
      headers = headers.append('Access-Control-Allow-Origin', '*');
    }else{
      headers = headers.append('Authorization', `${this.token}`);
      headers = headers.append('content-type', 'application/json');
      headers = headers.append('Access-Control-Allow-Origin', '*');
    }

    const reqclone = req.clone({
      headers
    });

    return next.handle(reqclone).pipe(   
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          
        }
      }, (res: any) => {
        if (res instanceof HttpErrorResponse) {
          if(res.status === 301 || res.status === 302 || res.status === 303){
            location.href = res.error           
          }
          if(res.status === 401){
            this.redirectService.login();
          }
          if(res.status === 404){
            this.redirectService.error404();
          }
          if(res.status === 500){
            this.redirectService.error500();
          }
          if(res.status === 409){
            let userName = JSON.parse(localStorage.getItem("userName"));
            let password = JSON.parse(localStorage.getItem("password"));

            const login: Ilogin = {
              UserName: userName,
              Password: password,
              EmailAddress: null,
              SecurityCode: '',
              Token2AF: '',
              RefreshToken: true,
            };

            this.token = "";
            
            this.redirectService.SubmitLogin(login, true);
          }
        }
      })
    );

  }
}
