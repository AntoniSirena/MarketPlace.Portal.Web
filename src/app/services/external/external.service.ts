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
    const data: Iuser = {
      Id: user.Id,
      UserName: user.UserName,
      Password: user.Password,
      Name: user.Name,
      SurName: user.SurName,
      EmailAddress: user.EmailAddress,
      StatusId: user.StatusId,
      PersonId: user.PersonId,
      Image: user.Image,
      IsActive: user.IsActive,
      IsDeleted: user.IsDeleted,
      CreationTime: user.CreationTime,
      CreatorUserId: user.CreatorUserId,
      LastModificationTime: user.LastModificationTime,
      LastModifierUserId: user.LastModifierUserId,
      DeletionTime: user.DeletionTime,
      DeleterUserId: user.DeleterUserId,
    };

    let Json = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/external/CreateUser', Json, {headers: headers});
  }

  getEnterpriseInfo():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/external/GetEnterpriseInfo');
  }

}
