import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PortadaService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getTemplateByOperation(operation: string): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/portada/GetTemplate?operation=${operation}`);
  }

  getNoveltiesByType(noveltyType: string): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/portada/GetNovelties?noveltyType=${noveltyType}`);
  }

}
