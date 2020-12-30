import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { Profile, _Profile } from '../../models/profile/profile';
import { Ilogin } from '../../interfaces/Ilogin/ilogin';
import { Iresponse } from '../../interfaces/Iresponse/iresponse';
import { Role, Users, PortadaUser } from './../../global/constant';


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
            localStorage.setItem("personalData", `${JSON.stringify(this.profile.Profile.Person)}`);
            localStorage.setItem("userData", `${JSON.stringify(this.profile.Profile.User)}`);
            localStorage.setItem("token", `${JSON.stringify(this.profile.Profile.User.Token)}`);
            localStorage.setItem("password", `${JSON.stringify(request.Password)}`);
            localStorage.setItem("userName", `${JSON.stringify(this.profile.Profile.User.UserName)}`);
            localStorage.setItem("userId", `${JSON.stringify(this.profile.Profile.User.Id)}`);
            localStorage.setItem("canCreate", `${JSON.stringify(this.profile.Profile.User.CanCreate)}`);
            localStorage.setItem("canEdit", `${JSON.stringify(this.profile.Profile.User.CanEdit)}`);
            localStorage.setItem("canDelete", `${JSON.stringify(this.profile.Profile.User.CanDelete)}`);

            localStorage.setItem("isVisitorUser", `${JSON.stringify(this.profile.Profile.User.IsVisitorUser)}`);
            localStorage.setItem('currentMenuTemplate', `${JSON.stringify(this.profile.Profile.User.MenuTemplate)}`);

            //welcome to system
            this.welcomeToSystem();

          });

          //Se ejecuta cuando se manda a refrescar el token (se genera uno nuevo, para que el usuario siga navegando).
        } else {
          //profile
          this.profile = response.Data;
          localStorage.setItem("profile", `${JSON.stringify(this.profile.Profile)}`);
          localStorage.setItem("personalData", `${JSON.stringify(this.profile.Profile.Person)}`);
          localStorage.setItem("userData", `${JSON.stringify(this.profile.Profile.User)}`);
          localStorage.setItem("token", `${JSON.stringify(this.profile.Profile.User.Token)}`);
          localStorage.setItem("password", `${JSON.stringify(request.Password)}`);
          localStorage.setItem("userName", `${JSON.stringify(this.profile.Profile.User.UserName)}`);
          localStorage.setItem("userId", `${JSON.stringify(this.profile.Profile.User.Id)}`);
          localStorage.setItem("canCreate", `${JSON.stringify(this.profile.Profile.User.CanCreate)}`);
          localStorage.setItem("canEdit", `${JSON.stringify(this.profile.Profile.User.CanEdit)}`);
          localStorage.setItem("canDelete", `${JSON.stringify(this.profile.Profile.User.CanDelete)}`);

          localStorage.setItem("isVisitorUser", `${JSON.stringify(this.profile.Profile.User.IsVisitorUser)}`);
          localStorage.setItem('currentMenuTemplate', `${JSON.stringify(this.profile.Profile.User.MenuTemplate)}`);

          //Check if the user is a visitor
          if (isUserPortada) {
            //welcome to system
            this.welcomeToSystem();
          }
          if (!isUserPortada) {
            //welcome to login page
            this.router.navigate(['login']).then(() => {
              window.location.reload();
            });
          }

        }

      } else {
        if (window.location.hash.match('login') || window.location.hash.match('second-factor-authentication')) {
          Swal.fire({
            icon: 'warning',
            title: response.Message,
            showConfirmButton: true,
            timer: 7000
          });
        } else {

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
      let userName = JSON.parse(localStorage.getItem('userName'));

      if (userName !== Users.Visitor) {
        this.loginSevice.logOut(userId).subscribe((response: any) => {
        },
          error => {
            console.log(JSON.stringify(error));
          });
      }

      if (isAutGuard) {
        this.router.navigate(['login']).then(() => {
        });
      } else {

        if (userName !== Users.Visitor) {
          Swal.fire({
            icon: 'warning',
            title: 'Estimado usuario su sesión ha expirado',
            showConfirmButton: false,
            timer: 4000
          }).then(() => {
            this.loginUserVisitador(false); 
          });
        }

        if (userName === Users.Visitor) {
          this.loginUserVisitador(); 
        }
        
      }

    }

  }


  logout() {

    this.router.navigate(['login']).then(() => {
      let userId = JSON.parse(localStorage.getItem('userId'));
      this.loginSevice.logOut(userId).subscribe((response: any) => {
      },
        error => {
          console.log(JSON.stringify(error));
        });
    });

  }


  error500() {
    Swal.fire({
      icon: 'warning',
      title: 'Estimado usuario ha ocurrido un error interno',
      showConfirmButton: false,
      timer: 4000
    }).then(() => {

    });
  }

  error404() {

    if (this.profile.Profile.User.RoleShortName !== Role.Suscriptor || this.profile.Profile.User.RoleShortName !== Role.Visitor) {
      Swal.fire({
        icon: 'warning',
        title: 'Estimado usuario los registros no fuerón encontrados',
        showConfirmButton: false,
        timer: 4000
      }).then(() => {

      });
    }
  }

  NoAuthorizedRequest() {

    if (localStorage.length > 0) {
      let userName = JSON.parse(localStorage.getItem('userName'));
      let isVisitorUser = JSON.parse(localStorage.getItem('isVisitorUser'));

      this.loginSevice.logOut(userName).subscribe((response: any) => {
      },
        error => {
          console.log(JSON.stringify(error));
        });

      if (!isVisitorUser) {
        Swal.fire({
          icon: 'warning',
          title: 'Estimado usuario la solicitud no fué autorizada',
          showConfirmButton: false,
          timer: 4000
        }).then(() => {
          this.router.navigate(['login']);
        });
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  welcomeToSystem() {
    this.router.navigate(['portada']).then(() => {
      setTimeout(function () { window.location.reload() }, 5000);
    });
  }

  register() {
    this.router.navigate(['register']);
  }


  loginUserVisitador(isUserPortada: boolean = true) {
    const login: Ilogin = {
      UserName: PortadaUser.UserName,
      Password: PortadaUser.Pass,
      EmailAddress: '',
      SecurityCode: '',
      Token2AF: '',
      RefreshToken: false,
    };

    this.SubmitLogin(login, true, isUserPortada);
  }

}
