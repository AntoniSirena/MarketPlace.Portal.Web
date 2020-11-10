import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Idocent } from '../../../interfaces/domain/Idocent/idocent';

@Injectable({
  providedIn: 'root'
})
export class DocentService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getDocents(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/docent');
  }

  getDocentById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/docent/' + id);
  }

  getDocentDetailsById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/docent/GetDocentDetails/' + id);
  }

  createDocent(docent: Idocent) {
    let data = JSON.stringify(docent);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/docent`, data, { headers: headers });
  }

  editDocent(docent: Idocent) {
    let data = JSON.stringify(docent);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/docent`, data, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/docent/' + id);
  }

}
