import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ilogin } from '../../interfaces/Ilogin/ilogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiURL

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  authenticate(request: Ilogin) {
    let Json = JSON.stringify(request);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/login/authenticate', Json, { headers: headers });
  }

  logOut(value: string) {
    let Json = JSON.stringify(value);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/login/logOut', Json, { headers: headers });
  }

  resetPassword(request: Ilogin) {
    let Json = JSON.stringify(request);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/login/resetPassword', Json, { headers: headers });
  }

  confirmPassword(request: Ilogin) {
    let Json = JSON.stringify(request);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/login/updatePassword', Json, { headers: headers });
  }

}
