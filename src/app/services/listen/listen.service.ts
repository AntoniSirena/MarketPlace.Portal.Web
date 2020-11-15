import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListenService {

  coreURL;

  constructor(private httpClient: HttpClient) { 
    this.coreURL = environment.coreURL;
  }

  readyToRequest():Observable<object>{    
    return this.httpClient.get(this.coreURL +'api/login/readyToRequest');
  }
}
