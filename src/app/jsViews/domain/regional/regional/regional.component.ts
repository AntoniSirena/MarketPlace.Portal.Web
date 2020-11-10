import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { Regional } from '../../../../models/domain/regional/regional';
import { RegionalService } from '../../../../services/domain/regional/regional.service';
import { Iregional } from '../../../../interfaces/domain/Irional/iregional';


@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css'],
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
export class RegionalComponent implements OnInit {

  editRegionalForm: FormGroup;
  createRegionalForm: FormGroup;

  _currentPage: number = 1;

  regional = new Regional();
  regionals = new Array<Regional>();

  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  //constructor
  constructor(
    private regionalService: RegionalService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }

  ngOnInit(): void {
    this.getRegionals();
  }


  getRegionals() {
    this.regionalService.getRegionals().subscribe((response: Array<Regional>) => {
      this.regionals = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getRegionalById(id: number) {
    this.regionalService.getRegionalId(id).subscribe((response: Regional) => {
      this.regional = response;

      //llenando el modal
      this.editRegionalForm = this.form.group({
        id: [`${this.regional.Id}`, Validators.required],
        shortName: [`${this.regional.ShortName}`, Validators.required],
        name: [`${this.regional.Name}`, Validators.required],
        description: [`${this.regional.Description}`],
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
    this.getRegionalById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //create
  create(formValue: any) {
    const regional: Iregional = {
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

    this.regionalService.createRegional(regional).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getRegionals();
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

    const regional: Iregional = {
      Id: this.regional.Id,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      CreationTime: this.regional.CreationTime,
      CreatorUserId: this.regional.CreatorUserId,
      LastModificationTime: this.regional.LastModificationTime,
      LastModifierUserId: this.regional.LastModifierUserId,
      DeleterUserId: this.regional.DeleterUserId,
      DeletionTime: this.regional.DeletionTime,
      IsActive: this.regional.IsActive,
      IsDeleted: this.regional.IsDeleted
    };

    this.regionalService.editRegional(regional).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getRegionals();
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
        this.regionalService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getRegionals();
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
    this.createRegionalForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }


  //edit from set value ''
  setValueEditFrom() {
    this.editRegionalForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }


}
