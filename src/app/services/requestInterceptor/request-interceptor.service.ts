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

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor  {

  token: string;

  constructor(private baseService: BaseService, private redirectService: RedirectService) {
    this.token = this.baseService.getUserToke();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.baseService.getUserToke();

    const headers = new HttpHeaders({
    'Authorization': `${this.token}`,
    'Content-Type': 'application/json'
    });

    const reqclone = req.clone({
      headers
    });

    return next.handle(reqclone).pipe(   
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if(err.status === 401){
            this.redirectService.login();
          }
        }
      })

    );
  }
}
