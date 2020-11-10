import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { Tanda } from '../../../../models/domain/tanda/tanda';
import { TandaService } from '../../../../services/domain/tanda/tanda.service';
import { Itanda } from '../../../../interfaces/domain/Itanda/itanda';


@Component({
  selector: 'app-tanda',
  templateUrl: './tanda.component.html',
  styleUrls: ['./tanda.component.css'],
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
export class TandaComponent implements OnInit {

  editTandaForm: FormGroup;
  createTandaForm: FormGroup;

  _currentPage: number = 1;

  tanda = new Tanda();
  tandas = new Array<Tanda>();


  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  //constructor
  constructor(
    private tandaService: TandaService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }


  ngOnInit(): void {
    this.getTandas();
  }


  getTandas() {
    this.tandaService.getTandas().subscribe((response: Array<Tanda>) => {
      this.tandas = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getTandaById(id: number) {
    this.tandaService.getTandaId(id).subscribe((response: Tanda) => {
      this.tanda = response;

      //llenando el modal
      this.editTandaForm = this.form.group({
        id: [`${this.tanda.Id}`, Validators.required],
        shortName: [`${this.tanda.ShortName}`, Validators.required],
        name: [`${this.tanda.Name}`, Validators.required],
        description: [`${this.tanda.Description}`],
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
    this.getTandaById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //create
  create(formValue: any) {
    const tanda: Itanda = {
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

    this.tandaService.createTanda(tanda).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getTandas();
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

    const tanda: Itanda = {
      Id: this.tanda.Id,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      CreationTime: this.tanda.CreationTime,
      CreatorUserId: this.tanda.CreatorUserId,
      LastModificationTime: this.tanda.LastModificationTime,
      LastModifierUserId: this.tanda.LastModifierUserId,
      DeleterUserId: this.tanda.DeleterUserId,
      DeletionTime: this.tanda.DeletionTime,
      IsActive: this.tanda.IsActive,
      IsDeleted: this.tanda.IsDeleted
    };

    this.tandaService.editTanda(tanda).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getTandas();
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
        this.tandaService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getTandas();
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
    this.createTandaForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

  //edit from set value ''
  setValueEditFrom() {
    this.editTandaForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

}
