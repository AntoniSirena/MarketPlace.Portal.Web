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
    const data = new InfoCurrentUser();
    data.UserName = infoCurrentUser.UserName,
    data.Password = infoCurrentUser.Password,
    data.Name = infoCurrentUser.Name,
    data.SurName = infoCurrentUser.SurName,
    data.EmailAddress = infoCurrentUser.EmailAddress

    let Json = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + 'api/common/UpdateInfoCurrentUser', Json, {headers: headers});
  }

  updateInfoCurrentPerson(infoCurrentPerson: InfoCurrentPerson){
    const data = new InfoCurrentPerson();
    data.FirstName = infoCurrentPerson.FirstName,
    data.SecondName = infoCurrentPerson.SecondName,
    data.SurName = infoCurrentPerson.SurName,
    data.SecondSurname = infoCurrentPerson.SecondSurname,
    data.FullName = infoCurrentPerson.FullName,
    data.BirthDate = infoCurrentPerson.BirthDate,
    data.GenderId = infoCurrentPerson.GenderId

    let Json = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + 'api/common/UpdateInfoCurrentPerson', Json, {headers: headers});
  }

}
