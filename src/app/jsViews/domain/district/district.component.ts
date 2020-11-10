import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistrictService } from '../../../services/domain/district/district.service';
import { District } from '../../../models/domain/district/district';
import { CommonService } from '../../../services/common/common.service';
import { Regional } from '../../../models/common/regional/regional';
import { Idistrict } from '../../../interfaces/domain/Idistrict/idistrict';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css'],
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
export class DistrictComponent implements OnInit {

  createDistrictForm: FormGroup;
  editDistrictForm: FormGroup;

  _currentPage: number = 1;

  districts = new Array<District>();
  district = new District();

  regionals = new Array<Regional>();

  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  //constructor
  constructor(
    private districtService: DistrictService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }


  ngOnInit(): void {
    this.getDistricts();
    this.getRegionals();
  }


  getDistricts() {
    this.districtService.getDistricts().subscribe((response: Array<District>) => {
      this.districts = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getRegionals() {
    this.commonService.getRegionals().subscribe((response: Array<Regional>) => {
      this.regionals = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getDistrictById(id: number) {
    this.districtService.getDistrictId(id).subscribe((response: District) => {
      this.district = response;

      //llenando el modal
      this.editDistrictForm = this.form.group({
        id: [`${this.district.Id}`, Validators.required],
        shortName: [`${this.district.ShortName}`, Validators.required],
        name: [`${this.district.Name}`, Validators.required],
        description: [`${this.district.Description}`],
        regionalId: [`${this.district.RegionalId}`, Validators.required]
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
    this.getDistrictById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //create
  create(formValue: any) {
    const district: Idistrict = {
      Id: 0,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      RegionalId: formValue.regionalId,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.districtService.createDistrict(district).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getDistricts();
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

    const district: Idistrict = {
      Id: this.district.Id,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      RegionalId: formValue.regionalId,
      CreationTime: this.district.CreationTime,
      CreatorUserId: this.district.CreatorUserId,
      LastModificationTime: this.district.LastModificationTime,
      LastModifierUserId: this.district.LastModifierUserId,
      DeleterUserId: this.district.DeleterUserId,
      DeletionTime: this.district.DeletionTime,
      IsActive: this.district.IsActive,
      IsDeleted: this.district.IsDeleted
    };

    this.districtService.editDistrict(district).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getDistricts();
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
        this.districtService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getDistricts();
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
    this.createDistrictForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      regionalId: ['', Validators.required]
    });
  }

  //edit from set value ''
  setValueEditFrom() {
    this.editDistrictForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      regionalId: ['', Validators.required]
    });
  }

}
