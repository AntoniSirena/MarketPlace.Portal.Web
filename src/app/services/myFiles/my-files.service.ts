import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MyFilesService {

  coreURL;

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }

  getFiles(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/file/GetFiles');
  }

  getFileById(id: number): Observable<object> {
    return this.httpClient.get(this.coreURL +`api/file/GetFileById?id=${id}`);
  }

}
