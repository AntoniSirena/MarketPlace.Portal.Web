import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Irole } from '../../interfaces/Irole/irole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  coreURL;

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }

  getRoles(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/role');
  }

  getRoleById(id: number): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/role/' + id);
  }

  editRole(role: Irole) {
    let Json = JSON.stringify(role);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.coreURL}api/role`, Json, { headers: headers });
  }

  createRole(role: Irole) {
    let Json = JSON.stringify(role);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.coreURL}api/role`, Json, { headers: headers });
  }

}
