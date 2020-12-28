import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../../../services/domain/appointment/appointment.service';
import { _Enterprise } from '../../../../models/domain/enterprise/enterprise';
import { AppointmentDetail } from './../../../../models/domain/appointmentDetail/appointment-detail';
import { Iappointment } from './../../../../interfaces/domain/iappointment/iappointment';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { NgSelectConfig } from '@ng-select/ng-select';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
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
export class AppointmentComponent implements OnInit {

  createForm: FormGroup;

  enterprises = new Array<_Enterprise>();
  appointmentDetail = new AppointmentDetail();

  step1: boolean;
  step2: boolean;


  constructor(
    private modalService: NgbModal,
    private form: FormBuilder,
    private appointmentService: AppointmentService,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText  = 'elementos no encontrados';
  }

  
  ngOnInit(): void {
    this.initCreateFrom();
    this.getEnterprises();
    this.step1 = true;
  }



  //Get gnterprises
  getEnterprises() {
    this.appointmentService.getEnterprises().subscribe((response: Array<_Enterprise>) => {
      this.enterprises = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //Get appointment details
  getAppointmentDetails(form: any) {

    const data: Iappointment = {
      Id: 0,
      EnterpriseId: form.enterpriseId,
      StatusId: form.statusId,
      Name: form.name,
      DocumentNomber: form.documentNomber,
      PhoneNumber: form.phoneNumber,
      Comment: form.comment,
      StartDate: form.startDate,
      ScheduledAppointment: false,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: null,
      IsDeleted: null,
    }

    this.appointmentService.getAppointmentDetails(data).subscribe((response: AppointmentDetail) => {
      this.appointmentDetail = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //next Step2
  nextStep2(form: any) {
    this.step1 = false;
    this.step2 = true;
    this.getAppointmentDetails(form);
  }

  //back Step1
  backStep1(form: any) {
    this.step1 = true;
    this.step2 = false;

    this.createForm = this.form.group({
      enterpriseId: [form.enterpriseId, Validators.required],
      statusId: [form.statusId],
      name: [form.name, Validators.required],
      documentNomber: [form.documentNomber],
      phoneNumber: [form.phoneNumber, Validators.required],
      comment: [form.comment],
      StartDate: [form.StartDate],
      scheduledAppointment: [false],
    });
  }


  create(form: any) {
    const data: Iappointment = {
      Id: 0,
      EnterpriseId: form.enterpriseId,
      StatusId: form.statusId,
      Name: form.name,
      DocumentNomber: '00000000000',
      PhoneNumber: form.phoneNumber,
      Comment: form.comment,
      StartDate: form.startDate,
      ScheduledAppointment: false,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false,
    }

    this.appointmentService.create(data).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 120000
        }).then(() => {
          this.initCreateFrom();
          this.step1 = true;
          this.step2 = false;
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 10000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }


  //init create from
  initCreateFrom() {
    this.createForm = this.form.group({
      enterpriseId: ['', Validators.required],
      statusId: [''],
      name: ['', Validators.required],
      documentNomber: [''],
      phoneNumber: ['', Validators.required],
      comment: [''],
      StartDate: [''],
      scheduledAppointment: [false],
    });
  }


}
