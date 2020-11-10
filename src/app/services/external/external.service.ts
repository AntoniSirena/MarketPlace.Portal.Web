import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';
import { Iuser } from '../../interfaces/Iuser/iuser';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  apiURL;

  constructor(private httpClient: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  createUser(user: Iuser){

    let Json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/external/CreateUser', Json, {headers: headers});
  }

  getEnterpriseInfo():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/external/GetEnterpriseInfo');
  }

  getValueRegisterButton():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/external/GetValueRegisterButton');
  }

  getTemplateByOperation(operation: string): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/external/GetTemplate?operation=${operation}`);
  }

}
