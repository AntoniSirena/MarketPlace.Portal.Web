import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { Profile } from '../../models/profile/profile';
import { locale } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router, private loginSevice: LoginService) { }

  login() {
    
    if(localStorage.length > 0){
      let userName = JSON.parse(localStorage.getItem('userName'));
      localStorage.clear();
      this.loginSevice.logOut(userName).subscribe((response: any) => {
      },
        error => {
          console.log(JSON.stringify(error));
      });
    }

    this.router.navigate(['login']).then(() => {
      Swal.fire({
        icon: 'warning',
        title: 'Su sesión ha expirado',
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
        window.location.reload();
      });
    });

  }


  logout() {

    this.router.navigate(['login']).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada con exito',
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        window.location.reload();
      });
    });

    let userName = JSON.parse(localStorage.getItem('userName'));
    localStorage.clear();
    this.loginSevice.logOut(userName).subscribe((response: any) => {
    },
      error => {
        console.log(JSON.stringify(error));
    });

  }

  register() {
    this.router.navigate(['register']);
  }

}
