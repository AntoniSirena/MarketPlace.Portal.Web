import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { Profile } from '../../models/profile/profile';
import { locale } from 'moment';
import { Ilogin } from '../../interfaces/Ilogin/ilogin';
import { Iresponse } from '../../interfaces/Iresponse/iresponse';
import { SystemConfiguration } from '../../Templates/systemConfiguration/system-configuration';


@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router,
    private loginSevice: LoginService,
    private loginService: LoginService,
  ) {

  }

  profile = new Profile();
  systemConfiguration = new SystemConfiguration();

  //Iniciar sesion
  SubmitLogin(request: Ilogin, refressToken: boolean = false, isUserPortada: boolean = false) {

    this.loginService.authenticate(request).subscribe((response: Iresponse) => {

      if (response.Code === '000') {

        //Se ejecuta cuando se manda a generar el token, al momento de iniciar sesion.
        if (!refressToken) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.Message,
            showConfirmButton: true,
            timer: 3000
          }).then(() => {
            //Cache info

            //profile
            this.profile = response.Data;
            localStorage.setItem("profile", `${JSON.stringify(this.profile.Profile)}`);
            localStorage.setItem("token", `${JSON.stringify(this.profile.Profile.User.Token)}`);
            localStorage.setItem("password", `${JSON.stringify(request.Password)}`);
            localStorage.setItem("userName", `${JSON.stringify(this.profile.Profile.User.UserName)}`);
            localStorage.setItem("userId", `${JSON.stringify(this.profile.Profile.User.Id)}`);
            localStorage.setItem("canCreate", `${JSON.stringify(this.profile.Profile.User.CanCreate)}`);
            localStorage.setItem("canEdit", `${JSON.stringify(this.profile.Profile.User.CanEdit)}`);
            localStorage.setItem("canDelete", `${JSON.stringify(this.profile.Profile.User.CanDelete)}`);

            localStorage.setItem("isVisitorUser", `${JSON.stringify(this.profile.Profile.User.IsVisitorUser)}`);

            localStorage.setItem('roleShortName', `${JSON.stringify(this.profile.Profile.User.RoleShortName)}`);
            localStorage.setItem('roleParent', `${JSON.stringify(this.profile.Profile.User.RoleParent)}`);
            localStorage.setItem('currentMenuTemplate', `${JSON.stringify(this.profile.Profile.User.MenuTemplate)}`);
            //template

            //welcome to system
            this.welcomeToSystem();

            //systemConfiguration
            this.systemConfiguration = response.Data;
            localStorage.setItem("systemConfiguration", `${JSON.stringify(this.systemConfiguration.Configuration)}`);
          });

          //Se ejecuta cuando se manda a refrescar el token (se genera uno nuevo, para que el usuario siga navegando).
        } else {
          //profile
          this.profile = response.Data;
          localStorage.setItem("profile", `${JSON.stringify(this.profile.Profile)}`);
          localStorage.setItem("token", `${JSON.stringify(this.profile.Profile.User.Token)}`);
          localStorage.setItem("password", `${JSON.stringify(request.Password)}`);
          localStorage.setItem("userName", `${JSON.stringify(this.profile.Profile.User.UserName)}`);
          localStorage.setItem("userId", `${JSON.stringify(this.profile.Profile.User.Id)}`);
          localStorage.setItem("canCreate", `${JSON.stringify(this.profile.Profile.User.CanCreate)}`);
          localStorage.setItem("canEdit", `${JSON.stringify(this.profile.Profile.User.CanEdit)}`);
          localStorage.setItem("canDelete", `${JSON.stringify(this.profile.Profile.User.CanDelete)}`);

          localStorage.setItem("isVisitorUser", `${JSON.stringify(this.profile.Profile.User.IsVisitorUser)}`);

          localStorage.setItem('roleShortName', `${JSON.stringify(this.profile.Profile.User.RoleShortName)}`);
          localStorage.setItem('roleParent', `${JSON.stringify(this.profile.Profile.User.RoleParent)}`);
          localStorage.setItem('currentMenuTemplate', `${JSON.stringify(this.profile.Profile.User.MenuTemplate)}`);
          //template

          //systemConfiguration
          this.systemConfiguration = response.Data;
          localStorage.setItem("systemConfiguration", `${JSON.stringify(this.systemConfiguration.Configuration)}`);

          //Check if the user is a visitor
          if (isUserPortada) {
            //welcome to system
            this.welcomeToSystem();
          }
        }

      } else {
        if (window.location.hash.match('#/login') || window.location.hash.match('#/second-factor-authentication')) {
          Swal.fire({
            icon: 'warning',
            title: response.Message,
            showConfirmButton: true,
            timer: 7000
          });
        } else {
          //window.location.reload();
        }
      }

    },
      error => {
        console.log(JSON.stringify(error));
      });

  }

  //Redirecciona a la pantalla de login
  login(isAutGuard: boolean = false) {

    if (localStorage.length > 0) {
      let userId = JSON.parse(localStorage.getItem('userId'));
      localStorage.clear();
      this.loginSevice.logOut(userId).subscribe((response: any) => {
      },
        error => {
          console.log(JSON.stringify(error));
        });

      if (isAutGuard) {
        this.router.navigate(['login']).then(() => {
          //window.location.reload();
        });
      } else {
        this.router.navigate(['login']).then(() => {
          Swal.fire({
            icon: 'warning',
            title: 'Estimado usuario su sesión ha expirado',
            showConfirmButton: false,
            timer: 4000
          }).then(() => {
            //window.location.reload();
          });
        });
      }

    }

  }

  logout() {

    this.router.navigate(['login']).then(() => {
      /* Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada con exito',
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        
      }); */
    });

    let userId = JSON.parse(localStorage.getItem('userId'));
    localStorage.clear();
    this.loginSevice.logOut(userId).subscribe((response: any) => {
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }

  error500() {
    Swal.fire({
      icon: 'warning',
      title: 'Estimado usuario ha ocurrido un error interno',
      showConfirmButton: false,
      timer: 4000
    }).then(() => {
      //window.location.reload();
    });
  }

  error404() {
    Swal.fire({
      icon: 'warning',
      title: 'Estimado usuario los registros no fuerón encontrados',
      showConfirmButton: false,
      timer: 4000
    }).then(() => {

    });
  }

  NoAuthorizedRequest() {

    if (localStorage.length > 0) {
      let userName = JSON.parse(localStorage.getItem('userName'));
      let isVisitorUser = JSON.parse(localStorage.getItem('isVisitorUser'));

      localStorage.clear();
      this.loginSevice.logOut(userName).subscribe((response: any) => {
      },
        error => {
          console.log(JSON.stringify(error));
        });

        if(!isVisitorUser){
          Swal.fire({
            icon: 'warning',
            title: 'Estimado usuario la solicitud no fué autorizada',
            showConfirmButton: false,
            timer: 4000
          }).then(() => {
            this.router.navigate(['login']);          
          });
        }else{
          this.router.navigate(['login']);
        }
    }
  }

  welcomeToSystem() {
    this.router.navigate(['portada']).then(() => {
      //window.location.reload();
    });
  }

  register() {
    this.router.navigate(['register']);
  }

}
