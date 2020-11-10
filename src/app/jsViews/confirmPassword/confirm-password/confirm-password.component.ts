import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Ilogin } from '../../../interfaces/Ilogin/ilogin';
import { LoginService } from '../../../services/login/login.service';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private form: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  confirmPassForm: FormGroup;

  userName: string;

  ngOnInit(): void {
    this.setValueconfirmPassForm();
    this.userName = this.activatedRoute.snapshot.paramMap.get('userName');
  }

  confirmPassword(form: any){
    if(!this.validatePassword(form)){
      Swal.fire({
        icon: 'warning',
        title: "Las contraseñas no coinciden, favor vuelva a ingresarla",
        showConfirmButton: true,
        timer: 4000
      });
    }else{
      const request: Ilogin = {
        UserName: this.userName,
        Password: form.password,
        EmailAddress: null,
        SecurityCode: '',
        Token2AF: '',
      };

      this.loginService.confirmPassword(request).subscribe((response: Iresponse) => {
        if (response.Code === '000') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.Message,
            showConfirmButton: true,
            timer: 4000
          }).then(() => {
            this.router.navigate(['login'])           
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: response.Message,
            showConfirmButton: true,
            timer: 4000
          });
        }
      },
        error => {
          console.log(JSON.stringify(error));
        });

    }
  }


  Cancel(){
    this.router.navigate(['login']);
  }

  validatePassword(form: any){
    if(form.password === form.confirmPassword){
      return true;
    }else{
      return false;
    }
  }

  setValueconfirmPassForm() {
    this.confirmPassForm = this.form.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }


}
