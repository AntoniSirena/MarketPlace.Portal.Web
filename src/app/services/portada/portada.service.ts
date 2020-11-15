import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PortadaService {

  coreURL;

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }

  getTemplateByOperation(operation: string): Observable<object> {
    return this.httpClient.get(this.coreURL +  `api/portada/GetTemplate?operation=${operation}`);
  }

  getNoveltiesByType(noveltyType: string): Observable<object> {
    return this.httpClient.get(this.coreURL +  `api/portada/GetNovelties?noveltyType=${noveltyType}`);
  }

}
