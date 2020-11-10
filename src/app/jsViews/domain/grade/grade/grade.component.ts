import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { Grade } from '../../../../models/domain/grade/grade';
import { GradeService } from '../../../../services/domain/grade/grade.service';
import { Igrade } from '../../../../interfaces/domain/Igrade/igrade';


@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
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
export class GradeComponent implements OnInit {

  createGradeForm: FormGroup;
  editGradeForm: FormGroup;

  _currentPage: number = 1;

  grade = new Grade();
  grades = new Array<Grade>();

  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  //constructor
  constructor(
    private gradeService: GradeService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }

  ngOnInit(): void {
    this.getGrades();
  }


  getGrades() {
    this.gradeService.getGrades().subscribe((response: Array<Grade>) => {
      this.grades = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getGradeById(id: number) {
    this.gradeService.getGradeId(id).subscribe((response: Grade) => {
      this.grade = response;

      //llenando el modal
      this.editGradeForm = this.form.group({
        id: [`${this.grade.Id}`, Validators.required],
        shortName: [`${this.grade.ShortName}`, Validators.required],
        name: [`${this.grade.Name}`, Validators.required],
        description: [`${this.grade.Description}`],
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
    this.getGradeById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }


  //create
  create(formValue: any) {
    const grade: Igrade = {
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

    this.gradeService.createGrade(grade).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getGrades();
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

    const grade: Igrade = {
      Id: this.grade.Id,
      ShortName: formValue.shortName,
      Name: formValue.name,
      Description: formValue.description,
      CreationTime: this.grade.CreationTime,
      CreatorUserId: this.grade.CreatorUserId,
      LastModificationTime: this.grade.LastModificationTime,
      LastModifierUserId: this.grade.LastModifierUserId,
      DeleterUserId: this.grade.DeleterUserId,
      DeletionTime: this.grade.DeletionTime,
      IsActive: this.grade.IsActive,
      IsDeleted: this.grade.IsDeleted
    };

    this.gradeService.editGrade(grade).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getGrades();
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
        this.gradeService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getGrades();
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
    this.createGradeForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

  //edit from set value ''
  setValueEditFrom() {
    this.editGradeForm = this.form.group({
      id: [0, Validators.required],
      shortName: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

}
