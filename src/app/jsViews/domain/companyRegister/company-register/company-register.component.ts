import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyRegisterService } from './../../../../services/domain/companyRegister/company-register.service';
import { CompanyRegister } from '../../../../models/domain/companyRegister/company-register';
import { CommonService } from '../../../../services/common/common.service';
import { CompanyCategory } from '../../../../models/common/CompanyCategory/company-category';
import { IcompanyRegister } from '../../../../interfaces/domain/IcompanyRegister/icompany-register';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { BaseService } from './../../../../services/base/base.service';
import { User } from './../../../../models/profile/profile';
import { Role } from './../../../../global/constant';


@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css'],
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
export class CompanyRegisterComponent implements OnInit {

  editForm: FormGroup;
  createForm: FormGroup;

  _currentPage: number = 1;

  companyRegisters = new Array<CompanyRegister>();
  companyRegister = new CompanyRegister();

  companyCategories = new Array<CompanyCategory>();

  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  userRole: string;
  validateRole: boolean = false;

  userData = new User();

  //constructor
  constructor(
    private companyRegisterservice: CompanyRegisterService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private form: FormBuilder,
    private baseService: BaseService) {
      this.userData = this.baseService.getUserData();
  }

  ngOnInit(): void {
    this.get();
    this.userRole = this.userData.RoleShortName;
    this._validateRole();
  }


  get() {
    this.companyRegisterservice.get().subscribe((response: Array<CompanyRegister>) => {
      this.companyRegisters = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getCompanyCategories() {
    this.commonService.getCompanyCategories().subscribe((response: Array<CompanyCategory>) => {
      this.companyCategories = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getById(id: number) {
    this.companyRegisterservice.getById(id).subscribe((response: CompanyRegister) => {
      this.companyRegister = response;

      //llenando el modal
      this.editForm = this.form.group({
        id: [`${this.companyRegister.Id}`, Validators.required],
        name: [`${this.companyRegister.Name}`, Validators.required],
        addreess: [`${this.companyRegister.Addreess}`, Validators.required],
        phoneNumber: [`${this.companyRegister.PhoneNumber}`, Validators.required],
        schedule: [`${this.companyRegister.Schedule}`, Validators.required],
        categoryId: [`${this.companyRegister.CategoryId}`, Validators.required],
        isReviewed: [this.companyRegister.IsReviewed, Validators.required],
      });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //open create modal
  openCreateModal(createModal) {
    this.getCompanyCategories();
    this.setValueCreateFrom();
    this.modalService.open(createModal, { size: 'lg' });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.getById(id);
    this.getCompanyCategories();
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  isReviewedTrue() {
    this.companyRegister.IsReviewed = true;
  }

  isReviewedFalse() {
    this.companyRegister.IsReviewed = false;
  }


  //create
  create(formValue: any) {

    const data: IcompanyRegister = {
      Id: 0,
      Name: formValue.name,
      Addreess: formValue.addreess,
      PhoneNumber: formValue.phoneNumber,
      Schedule: formValue.schedule,
      CategoryId: formValue.categoryId,
      IsReviewed: false,

      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.companyRegisterservice.create(data).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.get();
          this.modalService.dismissAll();
          Swal.fire({
            icon: 'warning',
            title: "Su Negocio ó Compañia sera actualizdo en el Directorio de la Portada en ó antes de 24 horas",
            showConfirmButton: true,
            timer: 10000
          });
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

  //edit
  edit(formValue: any) {

    const data: IcompanyRegister = {
      Id: this.companyRegister.Id,
      Name: formValue.name,
      Addreess: formValue.addreess,
      PhoneNumber: formValue.phoneNumber,
      Schedule: formValue.schedule,
      CategoryId: formValue.categoryId,
      IsReviewed: this.companyRegister.IsReviewed,

      CreationTime: this.companyRegister.CreationTime,
      CreatorUserId: this.companyRegister.CreatorUserId,
      LastModificationTime: this.companyRegister.LastModificationTime,
      LastModifierUserId: this.companyRegister.LastModifierUserId,
      DeleterUserId: this.companyRegister.DeleterUserId,
      DeletionTime: this.companyRegister.DeletionTime,
      IsActive: this.companyRegister.IsActive,
      IsDeleted: this.companyRegister.IsDeleted
    };

    this.companyRegisterservice.update(data).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.get();
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
        this.companyRegisterservice.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.get();
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


  //edit from set value ''
  setValueEditFrom() {
    this.editForm = this.form.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      addreess: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      schedule: ['', Validators.required],
      categoryId: ['', Validators.required],
      isReviewed: ['',],
    });
  }

  //create from set value ''
  setValueCreateFrom() {
    this.createForm = this.form.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      addreess: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      schedule: ['', Validators.required],
      categoryId: ['', Validators.required],
      isReviewed: [''],
    });
  }

  _validateRole() {
    if (this.userRole !== Role.Visitor && this.userRole !== Role.Suscriptor) {
      this.validateRole = true;
      return
    }
    this.validateRole = false;
    return
  }

}
