import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Idistrict } from '../../../interfaces/domain/Idistrict/idistrict';


@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getDistricts(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/district');
  }

  getDistrictId(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/district/' + id);
  }

  createDistrict(district: Idistrict) {
    let Json = JSON.stringify(district);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/district`, Json, { headers: headers });
  }

  editDistrict(district: Idistrict) {
    let Json = JSON.stringify(district);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/district`, Json, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/district/' + id);
  }
}
