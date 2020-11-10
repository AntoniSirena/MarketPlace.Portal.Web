import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';
import { BaseService } from '../../services/base/base.service';
import { InfoCurrentUser, InfoCurrentPerson } from '../../models/profile/profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiURL;

  constructor(private httpClient: HttpClient, private baseService: BaseService ) { 
    this.apiURL = environment.apiURL;
  }

  getGenders():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/profile/GetGenders');
  }

  getLocatorsTypes():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/profile/GetLocatorsTypes');
  }

  getInfoCurrentUser():Observable<object>{
    return this.httpClient.get(this.apiURL +'api/profile/GetInfoCurrentUser');
  }

  getInfoCurrentPerson():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/profile/GetInfoCurrentPerson');
  }

  getInfoCurrentLocators():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/profile/GetInfoCurrentLocators');
  }

  updateInfoCurrentUser(infoCurrentUser: InfoCurrentUser){

    let Json = JSON.stringify(infoCurrentUser);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + 'api/profile/UpdateInfoCurrentUser', Json, {headers: headers});
  }

  updateInfoCurrentPerson(infoCurrentPerson: InfoCurrentPerson){

    let Json = JSON.stringify(infoCurrentPerson);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + 'api/profile/UpdateInfoCurrentPerson', Json, {headers: headers});
  }

  updateProfileImagen(request: string){
    let Json = JSON.stringify(request);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + 'api/profile/UpdateProfileImagen', Json, {headers: headers});
  }

}
