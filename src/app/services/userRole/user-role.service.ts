import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';
import { IuserRole } from '../../interfaces/IuserRole/iuser-role';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  apiURL;

  constructor(private httpClient: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getUserRoles():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/userRole');
  }

  getUserRoleById(id: number):Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/userRole/' + id);
  }

  getUsers():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/userRole/GetUsers');
  }

  getRoles():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/userRole/GetRoles');
  }

  editUserRole(userRole: IuserRole){
    let Json = JSON.stringify(userRole);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/userRole`, Json, {headers: headers} );
  }
  
  createUserRole(userRole: IuserRole){
    let Json = JSON.stringify(userRole);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/userRole`, Json, {headers: headers} );
  }

}
