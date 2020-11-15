import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INovelty } from '../../interfaces/novelty/inovelty';

@Injectable({
  providedIn: 'root'
})
export class NoveltyService {

  coreURL;

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }

  getAll(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/novelty/GetNovelties');
  }

  getById(id: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/novelty/GetNoveltyById?Id=${id}`);
  }

  getNoveltyTypes(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/novelty/GetNoveltyTypes');
  }

  create(request: INovelty) {
    let data = JSON.stringify(request);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.coreURL}api/novelty/create`, data, { headers: headers });
  }

  update(request: INovelty) {
    let data = JSON.stringify(request);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.coreURL}api/novelty/update`, data, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.coreURL + `api/novelty/delete?Id=${id}`);
  }

}
