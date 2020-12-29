import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../../../services/domain/appointment/appointment.service';
import { Appointment, CheckAppointmentDetail } from '../../../../models/domain/appointmentDetail/appointment-detail';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';


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

  getAppointmentForm: FormGroup;

  _currentPage: number = 1;

  appointments = new Array<Appointment>();
  appointmentDetail = new CheckAppointmentDetail();


  @ViewChild('appointmentDetailModal') appointmentDetailModal: ElementRef;


  constructor(
    private modalService: NgbModal,
    private form: FormBuilder,
    private appointmentService: AppointmentService,
  ) {

  }

  ngOnInit(): void {
    this.initGetAppointmentForm();
    this.getAppointments(this.getAppointmentForm);
  }


  //Get appointments
  getAppointments(form: any) {
    this.appointmentService.getAppointments(form.value.startDate, form.value.endDate, form.value.statusId).subscribe((response: Iresponse) => {
      this.appointments = response.Data;
      
      if(response.Code !== "000"){
        window.location.reload();
      }
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

  updateStatus(statusShortName: string, id: number){
    Swal.fire({
      icon: 'warning',
      title: 'Funcionalidad en desarrollo',
      showConfirmButton: true,
      timer: 5000
    });
  }


  //Init appointment form
  initGetAppointmentForm() {
    this.getAppointmentForm = this.form.group({
      startDate: [''],
      endDate: [''],
      statusId: [0],
    });
  }

}
