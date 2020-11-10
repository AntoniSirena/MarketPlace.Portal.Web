import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INovelty } from '../../interfaces/novelty/inovelty';

@Injectable({
  providedIn: 'root'
})
export class NoveltyService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getAll(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/novelty/GetNovelties');
  }

  getById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + `api/novelty/GetNoveltyById?Id=${id}`);
  }

  getNoveltyTypes(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/novelty/GetNoveltyTypes');
  }

  create(request: INovelty) {
    let data = JSON.stringify(request);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/novelty/create`, data, { headers: headers });
  }

  update(request: INovelty) {
    let data = JSON.stringify(request);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/novelty/update`, data, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + `api/novelty/delete?Id=${id}`);
  }

}
