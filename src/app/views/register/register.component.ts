import { Component, OnInit } from '@angular/core';
import {ExternalService } from '../../services/external/external.service';
import { FormControl, FormGroup, FormBuilder, Validators , FormArray} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Iuser } from '../../interfaces/Iuser/iuser';
import { Iresponse } from '../../interfaces/Iresponse/iresponse';
import { UserType } from '../../models/common/userType/user-type';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  myForm: FormGroup;
  userTypes = new Array<UserType>();

  constructor(private externalService: ExternalService, private form: FormBuilder, private router :Router) { }

  ngOnInit() {
    this.myForm = this.form.group({
      userName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surName: ['', Validators.required],
      code: [''],
      phoneNumber: ['', Validators.required],
      userTypeId: ['', Validators.required]
    });

    this.getUserTyes();
  }


  //Get user types
  getUserTyes() {
    this.externalService.getUserTypes().subscribe((response: Array<UserType>) => {
      this.userTypes = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

 //Create user
  onSubmit(formValue: any){

    const user: Iuser ={
    Id: 0,
    UserName: formValue.userName,
    EmailAddress: formValue.emailAddress,
    Password: formValue.password,
    Name: formValue.name,
    SurName: formValue.surName,
    StatusId: 0,
    PersonId: null,
    UserTypeId: formValue.userTypeId,
    Image: null,
    Code: formValue.code,
    PhoneNumber: formValue.phoneNumber,
    LastLoginTime: null,
    LastLoginTimeEnd: null,
    IsOnline: false,
    DiviceIP: null,
    IsActive: true,
    IsDeleted: false,
    CreatorUserId: null,
    CreationTime: null,
    LastModifierUserId: null,
    LastModificationTime: null,
    DeleterUserId: null,
    DeletionTime: null
    };

    this.externalService.createUser(user).subscribe((response: Iresponse) => {
      if(response.Code === '000'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }

    },
    error => { console.log(JSON.stringify(error));
    });
  }


  goToLogin(){
    this.router.navigate(['login']);
  }

  goToPortada(){
    this.router.navigate(['portada']);
  }

}
