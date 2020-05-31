import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';
import { PersonTypeService } from '../../../services/personType/person-type.service';
import { IPersonType } from '../../../interfaces/IpersonType/iperson-type';
import { PersonType } from '../../../models/personType/person-type';



@Component({
  selector: 'app-person-type',
  templateUrl: './person-type.component.html',
  styleUrls: ['./person-type.component.css'],
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
export class PersonTypeComponent implements OnInit {

  editPersonTypeForm: FormGroup;
  createPersonTypeForm: FormGroup;

  _currentPage: number = 1;

  personType = new PersonType();
  personTypes = new Array<PersonType>();

  //constructor
  constructor(
    private personTypeService: PersonTypeService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }


  ngOnInit(): void {
    this.getPersonTypes();
  }


  getPersonTypes() {
    this.personTypeService.getPersonTypes().subscribe((response: Array<IPersonType>) => {
      this.personTypes = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getPersonTypeById(id: number) {
    this.personTypeService.getPersonTypeId(id).subscribe((response: IPersonType) => {
      this.personType = response;

      //llenando el modal
      this.editPersonTypeForm = this.form.group({
        id: [`${this.personType.Id}`, Validators.required],
        code: [`${this.personType.Code}`, Validators.required],
        description: [`${this.personType.Description}`, Validators.required],
      });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //open create modal
  openCreateModal(createModal) {
    this.setValueCreateFrom();
    this.modalService.open(createModal, { size: 'lg' });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.getPersonTypeById(id);
    this.getPersonTypes();
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }

  //create
  create(formValue: any) {

    const personType: IPersonType = {
      Id: 0,
      Code: formValue.code,
      Description: formValue.description,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.personTypeService.createPersonType(personType).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getPersonTypes();
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

  //edit
  edit(formValue: any) {

    const personType: IPersonType = {
      Id: this.personType.Id,
      Code: formValue.code,
      Description: formValue.description,
      CreationTime: this.personType.CreationTime,
      CreatorUserId: this.personType.CreatorUserId,
      LastModificationTime: this.personType.LastModificationTime,
      LastModifierUserId: this.personType.LastModifierUserId,
      DeleterUserId: this.personType.DeleterUserId,
      DeletionTime: this.personType.DeletionTime,
      IsActive: this.personType.IsActive,
      IsDeleted: this.personType.IsDeleted
    };

    this.personTypeService.editPersonType(personType).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getPersonTypes();
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
        this.personTypeService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getPersonTypes();
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
    this.editPersonTypeForm = this.form.group({
      id: [0, Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  //create from set value ''
  setValueCreateFrom() {
    this.createPersonTypeForm = this.form.group({
      id: [0, Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

}
