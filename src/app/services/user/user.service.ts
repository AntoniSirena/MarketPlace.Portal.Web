import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';
import { Iuser } from '../../interfaces/Iuser/iuser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL;

  constructor(private httpClient: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getUsers():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/user');
  }

  getUserById(id: number):Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/user/' + id);
  }

  getUserStatuses():Observable<object>{
    return this.httpClient.get(this.apiURL +'api/user/GetUserStatuses');
  }

  editUser(user: Iuser){
    let Json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/user`, Json, {headers: headers} );
  }
  
  createUser(user: Iuser){
    let Json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/user`, Json, {headers: headers} );
  }

}
