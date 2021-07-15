import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';
import { Iuser } from '../../interfaces/Iuser/iuser';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  coreURL;

  constructor(private httpClient: HttpClient) { 
    this.coreURL = environment.coreURL;
  }

  createUser(user: Iuser, imagenBase64: string){

    let data = {'user': user, 'imagenBase64': imagenBase64};
    let Json = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.coreURL + `api/external/CreateUser`, Json, {headers: headers});
  }

  getEnterpriseInfo():Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/external/GetEnterpriseInfo');
  }

  getValueRegisterButton():Observable<object>{  
    return this.httpClient.get(this.coreURL +'api/external/GetValueRegisterButton');
  }

  getTemplateByOperation(operation: string): Observable<object> {
    return this.httpClient.get(this.coreURL +  `api/external/GetTemplate?operation=${operation}`);
  }

  getUserTypes():Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/external/GetUserTypes');
  }

}
