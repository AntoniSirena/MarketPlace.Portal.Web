import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Itemplate } from '../../interfaces/Itemplate/itemplate';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }


  getTemplates(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/template');
  }

  getTemplateById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/template/' + id);
  }

  editTemplate(template: Itemplate) {
    let Json = JSON.stringify(template);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/template`, Json, { headers: headers });
  }

}
