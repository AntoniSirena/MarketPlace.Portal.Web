import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Iindicator } from '../../../interfaces/domain/Iindicator/iindicator';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  
  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  
  getIndicators(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/indicator');
  }

  getIndicatorId(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/indicator/' + id);
  }

  createIndicator(indicator: Iindicator) {
    let data = JSON.stringify(indicator);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/indicator`, data, { headers: headers });
  }

  editIndicator(indicator: Iindicator) {
    let data = JSON.stringify(indicator);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/indicator`, data, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/indicator/' + id);
  }


}
