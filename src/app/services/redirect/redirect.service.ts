import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router, private loginSevice: LoginService) { }

  login() {
    localStorage.clear();
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

    this.loginSevice.logOut().subscribe((response: any) => {
    },
      error => {
        console.log(JSON.stringify(error));
    });

    localStorage.clear();
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
  }

  register() {
    this.router.navigate(['register']);
  }

}
