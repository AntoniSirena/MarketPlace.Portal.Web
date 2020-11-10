import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Iarea } from '../../../interfaces/domain/Iarea/iarea';


@Injectable({
  providedIn: 'root'
})
export class AreaService {

  
  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getAreas(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/area');
  }

  getAreaById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/area/' + id);
  }

  createArea(area: Iarea) {
    let data = JSON.stringify(area);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/area`, data, { headers: headers });
  }

  editArea(area: Iarea) {
    let data = JSON.stringify(area);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/area`, data, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/area/' + id);
  }

}
