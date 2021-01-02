import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ienterprise } from '../../../interfaces/domain/ienterprise/ienterprise';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  coreURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }

  getAll(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/enterprise/GetAll');
  }

  getScheduleHours(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/enterprise/GetScheduleHours');
  }

  getById(id: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/enterprise/GetById?Id=${id}`);
  }

  create(request: Ienterprise) {
    let data = JSON.stringify(request);
    return this.httpClient.post(`${this.coreURL}api/enterprise/create`, data, { headers: this.headers });
  }

  update(request: Ienterprise) {
    let data = JSON.stringify(request);
    return this.httpClient.put(`${this.coreURL}api/enterprise/update`, data, { headers: this.headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.coreURL + `api/enterprise/delete?Id=${id}`);
  }
  
}
