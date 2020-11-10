import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { Indicator } from '../../../../models/domain/indictor/indicator';
import { IndicatorService } from '../../../../services/domain/indicator/indicator.service';
import { Iindicator } from '../../../../interfaces/domain/Iindicator/iindicator';


@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css'],
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
export class IndicatorComponent implements OnInit {

  createIndicatorForm: FormGroup;
  editIndicatorForm: FormGroup;

  _currentPage: number = 1;

  indicator = new Indicator();
  indicators = new Array<Indicator>();

  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  //constructor
  constructor(
    private indicatorService: IndicatorService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }

  ngOnInit(): void {
    this.getIndicators();
  }


  getIndicators() {
    this.indicatorService.getIndicators().subscribe((response: Array<Indicator>) => {
      this.indicators = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getIndicatorById(id: number) {
    this.indicatorService.getIndicatorId(id).subscribe((response: Indicator) => {
      this.indicator = response;

      //llenando el modal
      this.editIndicatorForm = this.form.group({
        id: [`${this.indicator.Id}`, Validators.required],
        shortName: [`${this.indicator.ShortName}`, Validators.required],
        name: [`${this.indicator.Name}`, Validators.required],
        description: [`${this.indicator.Description}`],
        value: [`${this.indicator.Value}`],
        isEvaluationFactor: [this.indicator.IsEvaluationFactor]
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
    this.getIndicatorById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //create
  create(formValue: any) {
    const indicator: Iindicator = {
      Id: 0,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      Value: formValue.value,
      IsEvaluationFactor: formValue.isEvaluationFactor,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.indicatorService.createIndicator(indicator).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getIndicators();
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

    const indicator: Iindicator = {
      Id: this.indicator.Id,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      Value: formValue.value,
      IsEvaluationFactor: formValue.isEvaluationFactor,
      CreationTime: this.indicator.CreationTime,
      CreatorUserId: this.indicator.CreatorUserId,
      LastModificationTime: this.indicator.LastModificationTime,
      LastModifierUserId: this.indicator.LastModifierUserId,
      DeleterUserId: this.indicator.DeleterUserId,
      DeletionTime: this.indicator.DeletionTime,
      IsActive: this.indicator.IsActive,
      IsDeleted: this.indicator.IsDeleted
    };

    this.indicatorService.editIndicator(indicator).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getIndicators();
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

  enabledTrue() {
    this.indicator.IsEvaluationFactor = true;
  }

  enabledFalse() {
    this.indicator.IsEvaluationFactor = false;
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
        this.indicatorService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getIndicators();
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
    this.createIndicatorForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      value: [0],
      isEvaluationFactor: [false]
    });
  }


  //edit from set value ''
  setValueEditFrom() {
    this.editIndicatorForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      value: [0],
      isEvaluationFactor: [false]
    });
  }

}
