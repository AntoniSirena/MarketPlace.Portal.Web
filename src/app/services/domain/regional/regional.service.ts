import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Iregional } from '../../../interfaces/domain/Irional/iregional';


@Injectable({
  providedIn: 'root'
})
export class RegionalService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }


  getRegionals(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/regional');
  }

  getRegionalId(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/regional/' + id);
  }

  createRegional(regional: Iregional) {
    let Json = JSON.stringify(regional);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/regional`, Json, { headers: headers });
  }

  editRegional(regional: Iregional) {
    let Json = JSON.stringify(regional);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/regional`, Json, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/regional/' + id);
  }
  
}
