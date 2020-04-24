import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) { }

  login(){
    localStorage.clear();
    this.router.navigate(['login']).then(() =>{
      Swal.fire({
        icon: 'warning',
        title: 'Su sesión ha expirado',
        showConfirmButton: false,
        timer: 3000
      }).then(() =>{
        window.location.reload();
      });
    });
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['login']).then(() =>{
      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada con exito',
        showConfirmButton: false,
        timer: 2000
      }).then(() =>{
        window.location.reload();
      });
    });
  }

  register(){
    this.router.navigate(['register']);
  }

}
