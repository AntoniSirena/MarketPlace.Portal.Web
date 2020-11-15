import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';
import { IuserRole } from '../../interfaces/IuserRole/iuser-role';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  coreURL;

  constructor(private httpClient: HttpClient) { 
    this.coreURL = environment.coreURL;
  }

  getUserRoles():Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/userRole');
  }

  getUserRoleById(id: number):Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/userRole/' + id);
  }

  getUsers():Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/userRole/GetUsers');
  }

  getRoles():Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/userRole/GetRoles');
  }

  editUserRole(userRole: IuserRole){
    let Json = JSON.stringify(userRole);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.coreURL}api/userRole`, Json, {headers: headers} );
  }
  
  createUserRole(userRole: IuserRole){
    let Json = JSON.stringify(userRole);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.coreURL}api/userRole`, Json, {headers: headers} );
  }

}
