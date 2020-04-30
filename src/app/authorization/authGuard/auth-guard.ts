import {Injectable} from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { ListenService } from '../../services/listen/listen.service';


@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

    constructor(private router: Router, private listenService: ListenService){

    }

    canActivate(){
        if(localStorage.length > 0){
            return true;
        }      
        this.router.navigate(['login']);
    }

    readyToRequest(){
        this.listenService.readyToRequest().subscribe((response: any) => {         
        },
          error => { console.log(JSON.stringify(error));
        });
    }


}
