import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../../../services/domain/appointment/appointment.service';
import { Appointment, CheckAppointmentDetail } from '../../../../models/domain/appointmentDetail/appointment-detail';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { AppointmentStatus } from './../../../../models/domain/appointmentDetail/appointment-detail';


@Component({
  selector: 'app-queue-appointment',
  templateUrl: './queue-appointment.component.html',
  styleUrls: ['./queue-appointment.component.css'],
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
export class QueueAppointmentComponent implements OnInit {

  appointmentForm: FormGroup;

  _currentPage: number = 1;

  appointments = new Array<Appointment>();
  appointmentDetail = new CheckAppointmentDetail();
  statuses = new Array<AppointmentStatus>();

  recordQuantity: string;

  @ViewChild('appointmentDetailModal') appointmentDetailModal: ElementRef;


  constructor(
    private modalService: NgbModal,
    private form: FormBuilder,
    private appointmentService: AppointmentService,
  ) {

  }

  ngOnInit(): void {
    this.initGetAppointmentForm();
    this.getAppointments(this.appointmentForm, true);
    this.getAppointmentStatuses();
  }


  //Get appointments
  getAppointments(form: any, isOnInit: boolean = true) {
    
    if(isOnInit){
      this.appointmentService.getAppointments(form.value.startDate, form.value.endDate, form.value.statusId).subscribe((response: Iresponse) => {

        if(response.Code === '000'){
          this.appointments = response.Data;
          this.recordQuantity = response.Message;
        }else{
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
    if(!isOnInit){

      if(form.statusId === null){
        form.statusId = 0;
      }
      this.appointmentService.getAppointments(form.startDate, form.endDate, form.statusId).subscribe((response: Iresponse) => {

        if(response.Code === '000'){
          this.appointments = response.Data;
          this.recordQuantity = response.Message;
        }else{
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
  }


  getAppointmentStatuses() {
    this.appointmentService.getAppointmentStatuses().subscribe((response: Array<AppointmentStatus>) => {
      this.statuses = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  openDetailModal(number: number){
    this.appointmentService.getCheckAppointmentDetail(number).subscribe((response: CheckAppointmentDetail) => {
      this.appointmentDetail = response;
      this.modalService.open(this.appointmentDetailModal, { size: 'lg', scrollable: true, backdrop: 'static' });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  updateStatus(status: string, id: number){

    this.initGetAppointmentForm();

    if(status === 'InProcess'){
      Swal.fire({
        title: 'Esta seguro que desea empezar este turno?',
        text: "Los cambios no podran ser revertidos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, empezar!'
      }).then((result) => {
        if (result.value) {
          //delete service
          this.appointmentService.updateStatus(status, id).subscribe((response: Iresponse) => {
            if (response.Code === '000') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.Message,
                showConfirmButton: true,
                timer: 3000
              }).then(() => {
                this.getAppointments(this.appointmentForm);
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: response.Message,
                showConfirmButton: true,
                timer: 3000
              });
            }
          },
            error => {
              console.log(JSON.stringify(error));
            });
  
        }
      })
    }

    if(status === 'Finished'){
      Swal.fire({
        title: 'Esta seguro que desea finalizar este turno?',
        text: "Los cambios no podran ser revertidos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar!'
      }).then((result) => {
        if (result.value) {
          //delete service
          this.appointmentService.updateStatus(status, id).subscribe((response: Iresponse) => {
            if (response.Code === '000') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.Message,
                showConfirmButton: true,
                timer: 3000
              }).then(() => {
                this.getAppointments(this.appointmentForm);
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: response.Message,
                showConfirmButton: true,
                timer: 3000
              });
            }
          },
            error => {
              console.log(JSON.stringify(error));
            });
  
        }
      })
    }

    if(status === 'Cancelled'){
      Swal.fire({
        title: 'Esta seguro que desea cancelar este turno?',
        text: "Los cambios no podran ser revertidos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, empezar!'
      }).then((result) => {
        if (result.value) {
          //delete service
          this.appointmentService.updateStatus(status, id).subscribe((response: Iresponse) => {
            if (response.Code === '000') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.Message,
                showConfirmButton: true,
                timer: 3000
              }).then(() => {
                this.getAppointments(this.appointmentForm);
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: response.Message,
                showConfirmButton: true,
                timer: 3000
              });
            }
          },
            error => {
              console.log(JSON.stringify(error));
            });
  
        }
      })
    }

  }


  //Init appointment form
  initGetAppointmentForm() {
    this.appointmentForm = this.form.group({
      startDate: [''],
      endDate: [''],
      statusId: [0],
    });
  }

}
