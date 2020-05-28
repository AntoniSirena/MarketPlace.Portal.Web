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

  authenticate(login: Ilogin) {
    let Json = JSON.stringify(login);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/login/authenticate', Json, { headers: headers });
  }

  logOut(userName: string) {
    let Json = JSON.stringify(userName);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/login/logOut', Json, { headers: headers });
  }

}
