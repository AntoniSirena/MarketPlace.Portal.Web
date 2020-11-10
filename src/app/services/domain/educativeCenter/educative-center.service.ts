import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IeducativeCenter } from '../../../interfaces/domain/IeducativeCenter/ieducative-center';

@Injectable({
  providedIn: 'root'
})
export class EducativeCenterService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getEducativeCenters(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/educativeCenter');
  }

  getEducativeCenterId(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/educativeCenter/' + id);
  }

  createEducativeCenter(educativeCenter: IeducativeCenter) {
    let Json = JSON.stringify(educativeCenter);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/educativeCenter`, Json, { headers: headers });
  }

  editEducativeCenter(educativeCenter: IeducativeCenter) {
    let Json = JSON.stringify(educativeCenter);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/educativeCenter`, Json, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/educativeCenter/' + id);
  }

}
