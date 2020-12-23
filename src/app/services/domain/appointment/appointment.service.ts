import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Iappointment } from './../../../interfaces/domain/iappointment/iappointment';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  coreURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }


  create(request: Iappointment) {
    let data = JSON.stringify(request);
    return this.httpClient.post(`${this.coreURL}api/appointment/Create`, data, { headers: this.headers });
  }

  getEnterprises(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/appointment/GetEnterprises');
  }

  getAppointmentDetails(request: Iappointment): Observable<object>  {
    let data = JSON.stringify(request);
    return this.httpClient.post(`${this.coreURL}api/appointment/GetAppointmentDetails`, data, { headers: this.headers });
  }

}
