import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoveltyService } from '../../../services/novelty/novelty.service';
import { Novelty, NoveltyType } from '../../../models/novelty/novelty';
import { INovelty } from '../../../interfaces/novelty/inovelty';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-novelty',
  templateUrl: './novelty.component.html',
  styleUrls: ['./novelty.component.css'],
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
export class NoveltyComponent implements OnInit {

  createForm: FormGroup;
  editForm: FormGroup;

  _currentPage: number = 1;

  novelties = new Array<Novelty>();
  novelty = new Novelty();
  NoveltyTypes = new Array<NoveltyType>();

  inputFiles: any = '';

  //Permissions
  canCreate = JSON.parse(localStorage.getItem("canCreate"));
  canEdit = JSON.parse(localStorage.getItem("canEdit"));
  canDelete = JSON.parse(localStorage.getItem("canDelete"));

  constructor(
    private noveltyService: NoveltyService,
    private modalService: NgbModal,
    private form: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  //Se ejecuta después que el DOM finaliza un operación
  ngAfterViewChecked() {
    this.setImgNovelty();
  }


  getAll() {
    this.noveltyService.getAll().subscribe((response: Array<Novelty>) => {
      this.novelties = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getById(editModal, id: number) {
    this.noveltyService.getById(id).subscribe((response: Novelty) => {
      this.novelty = response;

      //llenando el modal
      this.editForm = this.form.group({
        id: [`${this.novelty.Id}`, Validators.required],
        title: [this.novelty.Title, Validators.required],
        description: [`${this.novelty.Description}`, Validators.required],
        isEnabled: [this.novelty.IsEnabled],
        isPublic: [this.novelty.IsPublic],
        noveltyTypeId: [`${this.novelty.NoveltyTypeId}`],
        img: [`${this.novelty.Img}`],
        imgPath: [`${this.novelty.ImgPath}`],
        startDate: [this.novelty.StartDate],
        endDate: [this.novelty.EndDate],
      });

      this.modalService.open(editModal, { size: 'lg', backdrop: 'static', scrollable: true });

    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getNoveltyTypes() {
    this.noveltyService.getNoveltyTypes().subscribe((response: Array<NoveltyType>) => {
      this.NoveltyTypes = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //upload file
  uploadFile(event) {
  }

  //set img novelty
  setImgNovelty() {
    if (this.inputFiles !== '') {
      if (this.inputFiles.length > 0) {
        this.novelty.Img = this.inputFiles[0].base64;
      }
    }
  }


  //open create modal
  openCreateModal(createModal) {
    this.novelty.Img = '';
    this.setValueCreateFrom();
    this.getNoveltyTypes();
    this.modalService.open(createModal, { size: 'lg', backdrop: 'static', scrollable: true });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.novelty.Img = '';
    this.setValueEditFrom();
    this.getById(editModal, id);
    this.getNoveltyTypes();
  }


  //Enabled check
  isEnabledTrue() {
    this.novelty.IsEnabled = true;
  }

  isEnabledFalse() {
    this.novelty.IsEnabled = false;
  }

  isPublicTrue() {
    this.novelty.IsPublic = true;
  }

  isPublicFalse() {
    this.novelty.IsPublic = false;
  }


  //create
  create(formValue: any) {
    
    const novelty: INovelty = {
      Id: 0,
      Title: formValue.title,
      Description: formValue.description,
      IsEnabled: formValue.isEnabled,
      IsPublic: formValue.isPublic,
      NoveltyTypeId: formValue.noveltyTypeId,
      Img: this.novelty.Img,
      ImgPath: this.novelty.ImgPath,
      StartDate: formValue.startDate,
      EndDate: formValue.endDate,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.noveltyService.create(novelty).subscribe((response: Iresponse) => {
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

    const novelty: INovelty = {
      Id: this.novelty.Id,
      Title: formValue.title,
      Description: formValue.description,
      IsEnabled: formValue.isEnabled,
      IsPublic: formValue.isPublic,
      NoveltyTypeId: formValue.noveltyTypeId,
      Img: this.novelty.Img,
      ImgPath: this.novelty.ImgPath,
      StartDate: formValue.startDate,
      EndDate: formValue.endDate,
      CreatorUserId: this.novelty.CreatorUserId,
      CreationTime: this.novelty.CreationTime,
      LastModifierUserId: this.novelty.LastModifierUserId,
      LastModificationTime: this.novelty.LastModificationTime,
      DeleterUserId: this.novelty.DeleterUserId,
      DeletionTime: this.novelty.DeletionTime,
      IsActive: this.novelty.IsActive,
      IsDeleted: this.novelty.IsDeleted
    };

    this.noveltyService.update(novelty).subscribe((response: Iresponse) => {
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
        this.noveltyService.delete(id).subscribe((response: Iresponse) => {
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

  //create from set value ''
  setValueCreateFrom() {
    this.createForm = this.form.group({
      id: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      isEnabled: [false],
      isPublic: [false],
      noveltyTypeId: ['', Validators.required],
      img: [''],
      imgPath: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  //edit from set value ''
  setValueEditFrom() {
    this.createForm = this.form.group({
      id: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      isEnabled: [''],
      isPublic: [''],
      noveltyTypeId: ['', Validators.required],
      img: [''],
      imgPath: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

}
