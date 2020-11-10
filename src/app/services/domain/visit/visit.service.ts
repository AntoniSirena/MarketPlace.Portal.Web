import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ivisit } from '../../../interfaces/domain/Ivisit/ivisit';


@Injectable({
  providedIn: 'root'
})
export class VisitService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  
  getVisits(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/visit');
  }

  getVisitId(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/visit/' + id);
  }

  createVisit(visit: Ivisit) {
    let data = JSON.stringify(visit);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/visit`, data, { headers: headers });
  }

  editVisit(visit: Ivisit) {
    let data = JSON.stringify(visit);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/visit`, data, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/visit/' + id);
  }

}
