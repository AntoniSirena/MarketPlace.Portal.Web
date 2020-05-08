import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IconfigurationParameter } from '../../interfaces/IconfigurationParameter/iconfiguration-parameter';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationParameterService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getConfigurationParameters(): Observable<object> {
    return this.httpClient.get(this.apiURL + 'Api/ConfigurationParameter');
  }

  getConfigurationParameterById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'Api/ConfigurationParameter/' + id);
  }

  editConfigurationParameter(configurationParameter: IconfigurationParameter) {
    let Json = JSON.stringify(configurationParameter);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}Api/ConfigurationParameter`, Json, { headers: headers });
  }

  createConfigurationParameter(configurationParameter: IconfigurationParameter) {
    let Json = JSON.stringify(configurationParameter);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}Api/ConfigurationParameter`, Json, { headers: headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'Api/ConfigurationParameter/' + id);
  }

}
