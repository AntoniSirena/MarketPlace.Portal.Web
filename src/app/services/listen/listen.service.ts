import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListenService {

  apiURL;

  constructor(private httpClient: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  readyToRequest():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/login/readyToRequest');
  }
}
