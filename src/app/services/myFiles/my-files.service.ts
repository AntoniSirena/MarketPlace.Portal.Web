import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MyFilesService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getFiles(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/file/GetFiles');
  }

  getFileById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL +`api/file/GetFileById?id=${id}`);
  }

}
