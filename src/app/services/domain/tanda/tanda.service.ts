import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Itanda } from '../../../interfaces/domain/Itanda/itanda';

@Injectable({
  providedIn: 'root'
})
export class TandaService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  
  getTandas(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/tanda');
  }

  getTandaId(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/tanda/' + id);
  }

  createTanda(tanda: Itanda) {
    let Json = JSON.stringify(tanda);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/tanda`, Json, { headers: headers });
  }

  editTanda(tanda: Itanda) {
    let Json = JSON.stringify(tanda);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/tanda`, Json, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/tanda/' + id);
  }

}
