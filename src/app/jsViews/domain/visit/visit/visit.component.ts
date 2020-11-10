import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { Visit } from '../../../../models/domain/visit/visit';
import { VisitService } from '../../../../services/domain/visit/visit.service';
import { Ivisit } from '../../../../interfaces/domain/Ivisit/ivisit';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css'],
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
export class VisitComponent implements OnInit {

  createVisitForm: FormGroup;
  editVisitForm: FormGroup;

  _currentPage: number = 1;

  visit = new Visit();
  visits = new Array<Visit>();

  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  //constructor
  constructor(
    private visitService: VisitService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }


  ngOnInit(): void {
    this.getVisits();
  }


  getVisits() {
    this.visitService.getVisits().subscribe((response: Array<Visit>) => {
      this.visits = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getVisitById(id: number) {
    this.visitService.getVisitId(id).subscribe((response: Visit) => {
      this.visit = response;

      //llenando el modal
      this.editVisitForm = this.form.group({
        id: [`${this.visit.Id}`, Validators.required],
        shortName: [`${this.visit.ShortName}`, Validators.required],
        name: [`${this.visit.Name}`, Validators.required],
        description: [`${this.visit.Description}`],
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
    this.getVisitById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //create
  create(formValue: any) {
    const visit: Ivisit = {
      Id: 0,
      ShortName: formValue.shortName,
      Name: formValue.name,
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

    this.visitService.createVisit(visit).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getVisits();
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

    const visit: Ivisit = {
      Id: this.visit.Id,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      CreationTime: this.visit.CreationTime,
      CreatorUserId: this.visit.CreatorUserId,
      LastModificationTime: this.visit.LastModificationTime,
      LastModifierUserId: this.visit.LastModifierUserId,
      DeleterUserId: this.visit.DeleterUserId,
      DeletionTime: this.visit.DeletionTime,
      IsActive: this.visit.IsActive,
      IsDeleted: this.visit.IsDeleted
    };

    this.visitService.editVisit(visit).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getVisits();
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
        this.visitService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getVisits();
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

  //create from set value ''
  setValueCreateFrom() {
    this.createVisitForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }


  //edit from set value ''
  setValueEditFrom() {
    this.editVisitForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }


}
