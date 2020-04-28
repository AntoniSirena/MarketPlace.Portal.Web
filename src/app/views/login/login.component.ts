import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService } from '../../services/login/login.service';
import {RedirectService} from '../../services/redirect/redirect.service'
import Swal from 'sweetalert2';
import { Ilogin } from '../../interfaces/Ilogin/ilogin';
import { Iresponse } from '../../interfaces/Iresponse/iresponse';
import { Profile } from '../../models/profile/profile';
import { SystemConfiguration } from '../../Templates/systemConfiguration/system-configuration';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  //constructor
  constructor(
    private loginService: LoginService, 
    private redirectService: RedirectService,
    //private externalService: ExternalService,
    private form: FormBuilder, 
    private router :Router
  ){  }

  loginForm: FormGroup;
  profile = new Profile();
  systemConfiguration = new SystemConfiguration();

  ngOnInit(){
    this.loginForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  };


  //Login
  onSubmit(loginForm: any){

    const login: Ilogin = {
      UserName: loginForm.userName,
      Password: loginForm.password,
      EmailAddress: null
    };

    this.loginService.authenticate(login).subscribe((response: Iresponse) => {
      console.log(response);

      if(response.Code === '000'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {  
          //Cache info

          //profile
          this.profile = response.Data;
          localStorage.setItem("profile", `${ JSON.stringify(this.profile.Profile) }`);
          localStorage.setItem("token", `${ JSON.stringify(this.profile.Profile.User.Token)}`);

          //go to dashboard
          this.router.navigate(['dashboard']);

          localStorage.setItem('roleShortName', `${ JSON.stringify(this.profile.Profile.User.RoleShortName) }`);
          localStorage.setItem('roleParent', `${ JSON.stringify(this.profile.Profile.User.RoleParent) }`);
          localStorage.setItem('currentMenuTemplate', `${ JSON.stringify(this.profile.Profile.User.MenuTemplate) }`);

          //template

          //systemConfiguration
          this.systemConfiguration = response.Data;
          localStorage.setItem("systemConfiguration", `${ JSON.stringify(this.systemConfiguration.Configuration) }`);

        });
      }else{
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        });
      }

    },
    error => { console.log(JSON.stringify(error));
    });

  }
  //end

  register(){
    this.redirectService.register();
  }

}
