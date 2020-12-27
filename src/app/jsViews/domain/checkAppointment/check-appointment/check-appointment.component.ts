import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../../../services/domain/appointment/appointment.service';
import { CheckAppointmentDetail } from '../../../../models/domain/appointmentDetail/appointment-detail';


@Component({
  selector: 'app-check-appointment',
  templateUrl: './check-appointment.component.html',
  styleUrls: ['./check-appointment.component.css'],
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
export class CheckAppointmentComponent implements OnInit {

  checkAppointmentForm: FormGroup;

  appointments = new CheckAppointmentDetail();
  appointmentDetail = new CheckAppointmentDetail();

  @ViewChild('appointmentDetailModal') appointmentDetailModal: ElementRef;


  constructor(
    private modalService: NgbModal,
    private form: FormBuilder,
    private appointmentService: AppointmentService,
  ) {

  }

  ngOnInit(): void {
    this.initcheckAppointmentForm();

  }


  checkAppointment(form: any){
    if(form.number === '' || form.number === null){
      form.number = 0;
    }
    if(form.phoneNumber === '' || form.phoneNumber === null){
      form.phoneNumber = 0;
    }

    this.appointmentService.checkAppointment(form.number, form.name, form.phoneNumber).subscribe((response: CheckAppointmentDetail) => {
      this.appointments = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getCheckAppointmentDetail(number: number){
    this.appointmentService.getCheckAppointmentDetail(number).subscribe((response: CheckAppointmentDetail) => {
      this.appointmentDetail = response;
      this.modalService.open(this.appointmentDetailModal, { size: 'lg', scrollable: true, backdrop: 'static' });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  initcheckAppointmentForm() {
    this.checkAppointmentForm = this.form.group({
      number: [''],
      name: [''],
      phoneNumber: [''],
    });
  }

}
