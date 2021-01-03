import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from '../../../../services/domain/enterprise/enterprise.service';
import { Enterprise, ScheduleHour } from './../../../../models/domain/enterprise/enterprise';
import { Ienterprise } from '../../../../interfaces/domain/ienterprise/ienterprise';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { ValidationsService } from '../../../../utilities/validation/validations.service';
import { User } from './../../../../models/profile/profile';
import { BaseService } from './../../../../services/base/base.service';


@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css'],
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
export class EnterpriseComponent implements OnInit {

  createForm: FormGroup;
  editForm: FormGroup;

  _currentPage: number = 1;

  inputFiles: any = '';

  enterprises = new Array<Enterprise>();
  enterprise = new Enterprise();

  scheduleHours = new Array<ScheduleHour>();

  userData = new User();

  //Permissions
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;

  constructor(
    private enterpriseService: EnterpriseService,
    private modalService: NgbModal,
    private form: FormBuilder,
    private validationsService: ValidationsService,
    private baseService: BaseService,
  ) {
    //Load permissions
    this.userData = this.baseService.getUserData();
    this.canCreate = this.userData.CanCreateEnterprise;
    this.canEdit = this.userData.CanEditEnterprise;
    this.canDelete = this.userData.CanDeleteEnterprise;
  }

  ngOnInit() {
    this.getAll();
    this.getScheduleHours();
  }


  //Se ejecuta después que el DOM finaliza un operación
  ngAfterViewChecked() {
    this.setImg();
  }


  getAll() {
    this.enterpriseService.getAll().subscribe((response: Array<Enterprise>) => {
      this.enterprises = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getScheduleHours() {
    this.enterpriseService.getScheduleHours().subscribe((response: Array<ScheduleHour>) => {
      this.scheduleHours = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getById(editModal, id: number) {
    this.enterpriseService.getById(id).subscribe((response: Enterprise) => {
      this.enterprise = response;

      //llenando el modal
      this.editForm = this.form.group({
        propetaryName: [this.enterprise.PropetaryName, Validators.required],
        name: [this.enterprise.Name, Validators.required],
        rnc: [this.enterprise.RNC],
        commercialRegister: [this.enterprise.CommercialRegister],
        phoneNumber: [this.enterprise.PhoneNumber, Validators.required],
        email: [this.enterprise.Email],
        address: [this.enterprise.Address],
        sigla: [this.enterprise.Sigla, Validators.required],
        slogan: [this.enterprise.Slogan],
        workSchedule: [this.enterprise.WorkSchedule, Validators.required],
        availableOnlineAppointment: [this.enterprise.AvailableOnlineAppointment],
        serviceTime: [this.enterprise.ServiceTime, Validators.required],
        numberAppointmentsAttendedByDay: [this.enterprise.NumberAppointmentsAttendedByDay, Validators.required],
        enterpriseDescription: [this.enterprise.EnterpriseDescription, Validators.required],
        scheduleHourId: [this.enterprise.ScheduleHourId, Validators.required],
        scheduleHourCloseId: [this.enterprise.ScheduleHourCloseId, Validators.required],
      });

      this.modalService.open(editModal, { size: 'lg', backdrop: 'static', scrollable: true });

    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //upload file
  uploadFile(event) {
  }

  //set img novelty
  setImg() {
    if (this.inputFiles !== '') {
      if (this.inputFiles.length > 0) {
        this.enterprise.Image = this.inputFiles[0].base64;
      }
    }
  }


  //open create modal
  openCreateModal(createModal) {
    this.initCreateFrom();
    this.modalService.open(createModal, { size: 'lg', backdrop: 'static', scrollable: true });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.initEditFrom();
    this.getById(editModal, id);
  }


  //Enabled check
  availableOnlineAppointment(flag: number) {
    if (flag === 1) {
      this.enterprise.AvailableOnlineAppointment = true;
    } else {
      this.enterprise.AvailableOnlineAppointment = false;
    }
  }


  //validate input
  validateInput(email: string): boolean {

    if (!this.validationsService.email(email)) {
      Swal.fire({
        icon: 'warning',
        title: "El correo no es válido, favor ingrese un correo válido",
        showConfirmButton: true,
        timer: 10000
      });
      return false;
    }

    return true;
  }

  //create
  create(formValue: any) {

    if (!this.validateInput(formValue.email)) {
      return
    }

    if (!this.validateServiceTime(formValue.serviceTime)) {
      Swal.fire({
        icon: 'warning',
        title: 'El tiempo de servicio debe ser mayor que 0',
        showConfirmButton: true,
        timer: 7000
      });
      return
    }

    const data: Ienterprise = {
      Id: 0,
      UserId: 0,
      PropetaryName: formValue.propetaryName,
      Name: formValue.name,
      RNC: formValue.rnc,
      CommercialRegister: formValue.commercialRegister,
      PhoneNumber: formValue.phoneNumber,
      Email: formValue.email,
      Address: formValue.address,
      Sigla: formValue.sigla,
      Slogan: formValue.slogan,
      WorkSchedule: formValue.workSchedule,
      AvailableOnlineAppointment: this.enterprise.AvailableOnlineAppointment,
      Image: this.enterprise.Image,
      ImagePath: null,
      ImageContenTypeShort: null,
      ImageContenTypeLong: null,
      ServiceTime: formValue.serviceTime,
      NumberAppointmentsAttendedByDay: formValue.numberAppointmentsAttendedByDay,
      EnterpriseDescription: formValue.enterpriseDescription,
      ScheduleHourId: formValue.scheduleHourId,
      ScheduleHourCloseId: formValue.scheduleHourCloseId,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.enterpriseService.create(data).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getAll();
          this.modalService.dismissAll();
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


  //edit
  edit(formValue: any) {

    if (!this.validateInput(formValue.email)) {
      return
    }

    if (!this.validateServiceTime(formValue.serviceTime)) {
      Swal.fire({
        icon: 'warning',
        title: 'El tiempo de servicio debe ser mayor que 0',
        showConfirmButton: true,
        timer: 7000
      });
      return
    }

    const data: Ienterprise = {
      Id: this.enterprise.Id,
      UserId: this.enterprise.UserId,
      PropetaryName: formValue.propetaryName,
      Name: formValue.name,
      RNC: formValue.rnc,
      CommercialRegister: formValue.commercialRegister,
      PhoneNumber: formValue.phoneNumber,
      Email: formValue.email,
      Address: formValue.address,
      Sigla: formValue.sigla,
      Slogan: formValue.slogan,
      WorkSchedule: formValue.workSchedule,
      AvailableOnlineAppointment: this.enterprise.AvailableOnlineAppointment,
      Image: this.enterprise.Image,
      ImagePath: this.enterprise.ImagePath,
      ImageContenTypeShort: this.enterprise.ImageContenTypeShort,
      ImageContenTypeLong: this.enterprise.ImageContenTypeLong,
      ServiceTime: formValue.serviceTime,
      NumberAppointmentsAttendedByDay: formValue.numberAppointmentsAttendedByDay,
      EnterpriseDescription: formValue.enterpriseDescription,
      ScheduleHourId: formValue.scheduleHourId,
      ScheduleHourCloseId: formValue.scheduleHourCloseId,
      CreatorUserId: this.enterprise.CreatorUserId,
      CreationTime: this.enterprise.CreationTime,
      LastModifierUserId: this.enterprise.LastModifierUserId,
      LastModificationTime: this.enterprise.LastModificationTime,
      DeleterUserId: this.enterprise.DeleterUserId,
      DeletionTime: this.enterprise.DeletionTime,
      IsActive: this.enterprise.IsActive,
      IsDeleted: this.enterprise.IsDeleted
    };


    this.enterpriseService.update(data).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getAll();
          this.modalService.dismissAll();
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


  //delete
  delete(id: number) {

    Swal.fire({
      title: 'Esta seguro que desea eliminar el registro ?',
      text: "Los cambios no podran ser revertidos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        //delete service
        this.enterpriseService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getAll();
              this.modalService.dismissAll();
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


  //init create from
  initCreateFrom() {
    this.createForm = this.form.group({
      propetaryName: ['', Validators.required],
      name: ['', Validators.required],
      rnc: [''],
      commercialRegister: [''],
      phoneNumber: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      sigla: ['', Validators.required],
      slogan: [''],
      workSchedule: ['', Validators.required],
      availableOnlineAppointment: [false],
      serviceTime: [0, Validators.required],
      numberAppointmentsAttendedByDay: [0, Validators.required],
      enterpriseDescription: ['', Validators.required],
      scheduleHourId: [0, Validators.required],
      scheduleHourCloseId: [0, Validators.required],
    });
  }

  //init edit from
  initEditFrom() {
    this.editForm = this.form.group({
      propetaryName: ['', Validators.required],
      name: ['', Validators.required],
      rnc: [''],
      commercialRegister: [''],
      phoneNumber: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      sigla: ['', Validators.required],
      slogan: [''],
      workSchedule: ['', Validators.required],
      availableOnlineAppointment: [false],
      serviceTime: [0, Validators.required],
      numberAppointmentsAttendedByDay: [0, Validators.required],
      enterpriseDescription: ['', Validators.required],
      scheduleHourId: [0, Validators.required],
      scheduleHourCloseId: [0, Validators.required],
    });
  }


  validateServiceTime(time: number): boolean {
    if (time < 1) {
      return false;
    }
    return true;
  }


}
