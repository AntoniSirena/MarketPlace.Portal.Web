import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Irole } from '../../interfaces/Irole/irole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getRoles(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/role');
  }

  getRoleById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/role/' + id);
  }

  editRole(role: Irole) {
    let Json = JSON.stringify(role);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/role`, Json, { headers: headers });
  }

  createRole(role: Irole) {
    let Json = JSON.stringify(role);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/role`, Json, { headers: headers });
  }

}
