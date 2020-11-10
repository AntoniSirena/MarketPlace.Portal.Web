import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducativeCenter } from '../../../../models/educativeCenter/educative-center';
import { District } from '../../../../models/common/district/district';
import { EducativeCenterService } from '../../../../services/domain/educativeCenter/educative-center.service';
import { CommonService } from '../../../../services/common/common.service';
import { IeducativeCenter } from '../../../../interfaces/domain/IeducativeCenter/ieducative-center';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-educative-center',
  templateUrl: './educative-center.component.html',
  styleUrls: ['./educative-center.component.css'],
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
export class EducativeCenterComponent implements OnInit {

  createEducativeCenterForm: FormGroup;
  editEducativeCenterForm: FormGroup;

  _currentPage: number = 1;

  educativeCenters = new Array<EducativeCenter>();
  educativeCenter = new EducativeCenter();

  districts = new Array<District>();

  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  //constructor
  constructor(
    private educativeCenterService: EducativeCenterService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }


  ngOnInit(): void {
    this.getEducativeCenters();
    this.getDistricts();
  }


  getEducativeCenters() {
    this.educativeCenterService.getEducativeCenters().subscribe((response: Array<EducativeCenter>) => {
      this.educativeCenters = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getDistricts() {
    this.commonService.getDistricts().subscribe((response: Array<District>) => {
      this.districts = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getEducativeCenterById(id: number) {
    this.educativeCenterService.getEducativeCenterId(id).subscribe((response: EducativeCenter) => {
      this.educativeCenter = response;

      //llenando el modal
      this.editEducativeCenterForm = this.form.group({
        id: [`${this.educativeCenter.Id}`, Validators.required],
        shortName: [`${this.educativeCenter.ShortName}`, Validators.required],
        name: [`${this.educativeCenter.Name}`, Validators.required],
        description: [`${this.educativeCenter.Description}`],
        districtId: [`${this.educativeCenter.DistrictId}`, Validators.required]
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
    this.getEducativeCenterById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //create
  create(formValue: any) {
    const edCenter: IeducativeCenter = {
      Id: 0,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      DistrictId: formValue.districtId,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.educativeCenterService.createEducativeCenter(edCenter).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getEducativeCenters();
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

    const edCenter: IeducativeCenter = {
      Id: this.educativeCenter.Id,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      DistrictId: formValue.districtId,
      CreationTime: this.educativeCenter.CreationTime,
      CreatorUserId: this.educativeCenter.CreatorUserId,
      LastModificationTime: this.educativeCenter.LastModificationTime,
      LastModifierUserId: this.educativeCenter.LastModifierUserId,
      DeleterUserId: this.educativeCenter.DeleterUserId,
      DeletionTime: this.educativeCenter.DeletionTime,
      IsActive: this.educativeCenter.IsActive,
      IsDeleted: this.educativeCenter.IsDeleted
    };

    this.educativeCenterService.editEducativeCenter(edCenter).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getEducativeCenters();
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
        this.educativeCenterService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getEducativeCenters();
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
    this.createEducativeCenterForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      districtId: ['', Validators.required]
    });
  }

  //edit from set value ''
  setValueEditFrom() {
    this.editEducativeCenterForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      districtId: ['', Validators.required]
    });
  }

}
