import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BaseService } from '../../../services/base/base.service';
import { ProfileService } from '../../../services/profile/profile.service';

import { Gender, Profile } from '../../../models/profile/profile';
import { LocatorsTypes } from '../../../models/profile/profile';
import { InfoCurrentUser } from '../../../models/profile/profile';
import { InfoCurrentPerson } from '../../../models/profile/profile';
import { InfoCurrentLocators } from '../../../models/profile/profile';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
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

  //constructor
  constructor(
    private modalService: NgbModal,
    private baseService: BaseService,
    private profileService: ProfileService,
    private form: FormBuilder
  ) {

    //Cagando la data desde el servidor
    this.profile = this.baseService.getProfile();
    this.getGenders();
    this.getInfoCurrentUser();
    this.getInfoCurrentPerson();
    this.getLocatorsTypes();
    this.getInfoCurrentLocators();

  }


  //Variables
  @ViewChild('content') _content: ElementRef;

  genders = new Gender();
  locatorsTypes = new LocatorsTypes();
  infoCurrentUser = new InfoCurrentUser();
  infoCurrentPerson = new InfoCurrentPerson();
  infoCurrentLocators = new InfoCurrentLocators();
  profile = new Profile();

  userForm: FormGroup;
  personForm: FormGroup;
  locatorsForm: FormGroup;


  //Init
  ngOnInit(): void {
    this.setValueEditFrom();
    this.setValueCreateFrom();
  }

  openProfileModal() {

    //abriendo el modal
    this.modalService.open(this._content, { size: 'lg', scrollable: true })

    //Llenando los input del tab usuario
    this.userForm = this.form.group({
      userName: [`${this.infoCurrentUser.UserName}`, Validators.required],
      password: [`${this.infoCurrentUser.Password}`, [Validators.required, Validators.minLength(8)]],
      name: [`${this.infoCurrentUser.Name}`, Validators.required],
      surName: [`${this.infoCurrentUser.SurName}`, Validators.required],
      emailAddress: [`${this.infoCurrentUser.EmailAddress}`, [Validators.required, Validators.email]]
    });

    //Llenando los input del tab persona
    this.personForm = this.form.group({
      firstName: [`${this.infoCurrentPerson.FirstName}`, Validators.required] || '',
      secondName: [`${this.infoCurrentPerson.SecondName}`,],
      surName: [`${this.infoCurrentPerson.SurName}`, Validators.required],
      secondSurname: [`${this.infoCurrentPerson.SecondSurname}`,],
      fullName: [`${this.infoCurrentPerson.FullName}`],
      birthDate: [`${this.infoCurrentPerson.BirthDate}`, Validators.required],
      genderId: [`${this.infoCurrentPerson.GenderId}`, Validators.required]
    });
  }

  getGenders() {
    this.profileService.getGenders().subscribe((response: Gender) => {
      this.genders = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getLocatorsTypes() {
    this.profileService.getLocatorsTypes().subscribe((response: LocatorsTypes) => {
      this.locatorsTypes = response;
    },
      error => {
        console.log(JSON.stringify(error));
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

  getInfoCurrentPerson() {
    this.profileService.getInfoCurrentPerson().subscribe((response: InfoCurrentPerson) => {
      this.infoCurrentPerson = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getInfoCurrentLocators() {
    this.profileService.getInfoCurrentLocators().subscribe((response: InfoCurrentLocators) => {
      this.infoCurrentLocators = response;
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


  currentPersonOnSubmit(formValue: any) {
    const infoCurrentPerson = new InfoCurrentPerson();
    infoCurrentPerson.FirstName = formValue.firstName,
      infoCurrentPerson.SurName = formValue.surName,
      infoCurrentPerson.SecondName = formValue.secondName,
      infoCurrentPerson.SecondSurname = formValue.secondSurname,
      infoCurrentPerson.FullName = formValue.fullName,
      infoCurrentPerson.BirthDate = formValue.birthDate,
      infoCurrentPerson.GenderId = formValue.genderId

    this.profileService.updateInfoCurrentPerson(infoCurrentPerson).subscribe((response: Iresponse) => {

      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        }).then(() => {
          this.getInfoCurrentPerson();
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


  //edit from set value ''
  setValueEditFrom() {
    this.userForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]]
    });

    this.personForm = this.form.group({
      firstName: ['', Validators.required],
      secondName: ['',],
      surName: ['', Validators.required],
      secondSurname: ['',],
      fullName: [''],
      birthDate: ['', Validators.required],
      genderId: ['', Validators.required]
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

    this.personForm = this.form.group({
      firstName: ['', Validators.required],
      secondName: ['',],
      surName: ['', Validators.required],
      secondSurname: ['',],
      fullName: [''],
      birthDate: ['', Validators.required],
      genderId: ['', Validators.required]
    });
  }

}
