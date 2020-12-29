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

  getAppointmentStatuses(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/appointment/GetAppointmentStatuses');
  }

  checkAppointment(number: number, name: string, phoneNumber: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/appointment/CheckAppointment?number=${number}&name=${name}&phoneNumber=${phoneNumber}`);
  }

  getAppointments(startDate: string, endDate: string, statusId: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/appointment/GetAppointments?startDate=${startDate}&endDate=${endDate}&statusId=${statusId}`);
  }

  updateStatus(status: string, id: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/appointment/UpdateStatus?status=${status}&id=${id}`);
  }

  getCheckAppointmentDetail(number: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/appointment/GetCheckAppointmentDetail?number=${number}`);
  }

  getAppointmentDetails(request: Iappointment): Observable<object>  {
    let data = JSON.stringify(request);
    return this.httpClient.post(`${this.coreURL}api/appointment/GetAppointmentDetails`, data, { headers: this.headers });
  }

}
