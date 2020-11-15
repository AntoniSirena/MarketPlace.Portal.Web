import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';
import { Iuser } from '../../interfaces/Iuser/iuser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  coreURL;

  constructor(private httpClient: HttpClient) { 
    this.coreURL = environment.coreURL;
  }

  getUsers():Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/user');
  }

  getUserById(id: number):Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/user/' + id);
  }

  getUserStatuses():Observable<object>{
    return this.httpClient.get(this.coreURL +'api/user/GetUserStatuses');
  }

  editUser(user: Iuser){
    let Json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.coreURL}api/user`, Json, {headers: headers} );
  }
  
  createUser(user: Iuser){
    let Json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.coreURL}api/user`, Json, {headers: headers} );
  }

  getUserDetails(userId: number):Observable<object>{
    return this.httpClient.get(this.coreURL +'api/user/GetUserDetails/' + userId);
  }

}
