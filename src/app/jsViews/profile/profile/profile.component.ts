import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BaseService } from '../../../services/base/base.service';
import { ProfileService } from '../../../services/profile/profile.service';

import { Profile, _Profile } from '../../../models/profile/profile';
import { InfoCurrentUser } from '../../../models/profile/profile';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';
import Swal from 'sweetalert2';
import { LocatorService } from '../../../services/locator/locator.service';
import { CommonService } from '../../../services/common/common.service';

import { FileReaderPromiseLikeService, FileReaderObservableLikeService } from 'fctrlx-angular-file-reader';
import { RedirectService } from '../../../services/redirect/redirect.service';
import { environment } from '../../../environments/environment';
import { SizeImageProfile } from './../../../configurations/jsConfig';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    FileReaderPromiseLikeService,
    FileReaderObservableLikeService
  ],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ProfileComponent implements OnInit {

  isVisitorUser: boolean = JSON.parse(localStorage.getItem("isVisitorUser")) || false;

  //constructor
  constructor(
    private redirectService: RedirectService,
    private modalService: NgbModal,
    private baseService: BaseService,
    private profileService: ProfileService,
    private form: FormBuilder,
  ) {

    //Cagando la data desde el servidor
    if(!this.isVisitorUser && localStorage.length > 0){
      this.profile = this.baseService.getProfile();

      setTimeout(() => {
        this.getInfoCurrentUser();
      }, 5000);

    }

    if(localStorage.length === 0){
      this.redirectService.loginUserVisitador();
    }

  }


  //Variables
  @ViewChild('content') _content: ElementRef;

  _currentPage: number = 1;

  infoCurrentUser = new InfoCurrentUser();
  profile = new Profile();

  userForm: FormGroup;

  buttonUpdateUserImg: boolean;

  inputFiles: any = '';

  imgProfile: any = '';
  imgProfileOriginServer: boolean = true;

  coreURL = environment.coreURL;
  img_Width = SizeImageProfile.width;
  img_height = SizeImageProfile.height;
  
  userId: number = JSON.parse(localStorage.getItem('userId'));

  //Init
  ngOnInit(): void {
    this.buttonUpdateUserImg = true;
    this.setValueEditFrom();
    this.setValueCreateFrom();
  }

  //Se ejecuta después que el DOM finaliza un operación
  ngAfterViewChecked() {
    this.setProfileImg();
  }


  openProfileModal() {

    if(!this.infoCurrentUser.UserName){
      return;
    }

    //abriendo el modal
    this.modalService.open(this._content, { size: 'lg', scrollable: true })

    //Llenando los input del tab usuario
    this.userForm = this.form.group({
      userName: [`${this.infoCurrentUser.UserName}`, Validators.required],
      password: [`${this.infoCurrentUser.Password}`, [Validators.required, Validators.minLength(8)]],
      name: [`${this.infoCurrentUser.Name}`, Validators.required] || '',
      surName: [`${this.infoCurrentUser.SurName}`, Validators.required] || '',
      emailAddress: [`${this.infoCurrentUser.EmailAddress}`, [Validators.required, Validators.email]],
      phoneNumber: [`${this.infoCurrentUser.PhoneNumber}`, Validators.required] || '',
    });

  }


  getInfoCurrentUser() {
    this.profileService.getInfoCurrentUser().subscribe((response: InfoCurrentUser) => {
      this.infoCurrentUser = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  currentUserOnSubmit(formValue: any) {
    const infoCurrentUser = new InfoCurrentUser();
    infoCurrentUser.UserName = formValue.userName,
      infoCurrentUser.Password = formValue.password,
      infoCurrentUser.Name = formValue.name,
      infoCurrentUser.SurName = formValue.surName,
      infoCurrentUser.EmailAddress = formValue.emailAddress,
      infoCurrentUser.PhoneNumber = formValue.phoneNumber,

      this.profileService.updateInfoCurrentUser(infoCurrentUser).subscribe((response: Iresponse) => {

        if (response.Code === '000') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.Message,
            showConfirmButton: true,
            timer: 3000
          }).then(() => {
            this.getInfoCurrentUser();
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


  //upload file
  uploadFile(event) {
    this.imgProfileOriginServer = false;
  }

  //set Img Profile
  setProfileImg() {
    if (this.inputFiles !== '') {
      if(this.inputFiles.length > 0){
        this.imgProfile = this.inputFiles[0];
      }
    }
  }

  //update Img Profile
  updateProfileImg() {
    this.buttonUpdateUserImg = false;

    this.profileService.updateProfileImagen(this.imgProfile).subscribe((response: Iresponse) => {
      this.buttonUpdateUserImg = true;
      
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        }).then(() => {
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        }).then(() => {
        });
      }
    },
      error => {
        this.buttonUpdateUserImg = true;
        console.log(JSON.stringify(error));
      });
  }


  //edit from set value ''
  setValueEditFrom() {
    this.userForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]]
    });
  }

  //create from set value ''
  setValueCreateFrom() {
    this.userForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]]
    });
  }

}
