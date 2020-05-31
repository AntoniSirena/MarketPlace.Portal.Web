import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPersonType } from '../../interfaces/IpersonType/iperson-type';


@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getPersonTypes(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/personType');
  }

  getPersonTypeId(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/personType/' + id);
  }

  createPersonType(personType: IPersonType) {
    let Json = JSON.stringify(personType);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/personType`, Json, { headers: headers });
  }

  editPersonType(personType: IPersonType) {
    let Json = JSON.stringify(personType);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/personType`, Json, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'Api/personType/' + id);
  }


}
