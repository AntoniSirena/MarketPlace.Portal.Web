import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketService } from './../../../../services/domain/market/market.service';
import { Category, Condition, Currency, Market, MarketType, SubCategory } from '../../../../models/domain/market/market';
import { BaseService } from '../../../../services/base/base.service';
import { User } from '../../../../models/profile/profile';
import { Imarket } from '../../../../interfaces/domain/imarket/imarket';
import { Iresponse } from './../../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
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
export class MarketComponent implements OnInit {

  createForm: FormGroup;
  editForm: FormGroup;

  _currentPage: number = 1;

  currencies = new Array<Currency>();
  marketTypes = new Array<MarketType>();
  conditions = new Array<Condition>();
  categories = new Array<Category>();
  subCategories = new Array<SubCategory>();

  markets = new Array<Market>();
  market = new Market();

  userData = new User();

  inputFiles: any = '';
  validateImg: boolean;

  //Permissions
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;


  constructor(private modalService: NgbModal,
    private form: FormBuilder,
    private marketService: MarketService,
    private baseService: BaseService,) {
    //Load permissions
    this.userData = this.baseService.getUserData();
    this.canCreate = this.userData.CanCreate;
    this.canEdit = this.userData.CanEdit;
    this.canDelete = this.userData.CanDelete;
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.getMarketTypes();
    this.getConditions();
    this.getCategories();
    this.getAll();
  }


  //Se ejecuta después que el DOM finaliza un operación
  ngAfterViewChecked() {
    this.setImg();
  }

  //upload file
  uploadFile(event) {
  }

  //set img novelty
  setImg() {
    if (this.inputFiles !== '') {
      if (this.inputFiles.length > 0) {
        this.market.Img = this.inputFiles[0].base64;
        this.validateImg = true;
      }
    }
  }

  getCurrencies() {
    this.marketService.getCurrencies().subscribe((response: Array<Currency>) => {
      this.currencies = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getMarketTypes() {
    this.marketService.getMarketTypes().subscribe((response: Array<MarketType>) => {
      this.marketTypes = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getConditions() {
    this.marketService.getConditions().subscribe((response: Array<Condition>) => {
      this.conditions = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getCategories() {
    this.marketService.getCategories().subscribe((response: Array<Category>) => {
      this.categories = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getSubCategories_ByCategoryId(id: number) {
    this.marketService.getSubCategories(id).subscribe((response: Array<SubCategory>) => {
      this.subCategories = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getAll() {
    this.marketService.getAll().subscribe((response: Array<Market>) => {
      this.markets = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getById(editModal, id: number) {
    this.marketService.getById(id).subscribe((response: Market) => {
      this.market = response;

      //llenando el modal
      this.editForm = this.form.group({
        title: [this.market.Title, Validators.required],
        price: [this.market.Price, Validators.required],
        currencyId: [this.market.CurrencyId, Validators.required],
        marketTypeId: [this.market.MarketTypeId, Validators.required],
        conditionId: [this.market.ConditionId, Validators.required],
        categoryId: [this.market.CategoryId, Validators.required],
        subCategoryId: [this.market.SubCategoryId, Validators.required],
        ubication: [this.market.Ubication, Validators.required],
        phoneNumber: [this.market.PhoneNumber, Validators.required],
      });

      this.getSubCategories_ByCategoryId(this.market.CategoryId);

      this.modalService.open(editModal, { size: 'lg', backdrop: 'static', scrollable: true });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //open create modal
  openCreateModal(createModal) {
    this.initCreateFrom();
    this.modalService.open(createModal, { size: 'lg', backdrop: 'static', scrollable: true });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.initEditFrom();
    this.getById(editModal, id);
  }


  //create
  create(formValue: any) {

    const data: Imarket = {
      Id: 0,
      Title: formValue.title,
      Price: formValue.price,
      CurrencyId: formValue.currencyId,
      MarketTypeId: formValue.marketTypeId,
      ConditionId: formValue.conditionId,
      CategoryId: formValue.categoryId,
      SubCategoryId: formValue.subCategoryId,
      Ubication: formValue.ubication,
      PhoneNumber: formValue.phoneNumber,
      Img: this.market.Img,
      ImgPath: null,
      ContenTypeShort: null,
      ContenTypeLong: null,
      CreationDate: null,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.marketService.create(data).subscribe((response: Iresponse) => {
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

    const data: Imarket = {
      Id: this.market.Id,
      Title: formValue.title,
      Price: formValue.price,
      CurrencyId: formValue.currencyId,
      MarketTypeId: formValue.marketTypeId,
      ConditionId: formValue.conditionId,
      CategoryId: formValue.categoryId,
      SubCategoryId: formValue.subCategoryId,
      Ubication: formValue.ubication,
      PhoneNumber: formValue.phoneNumber,
      Img: this.market.Img,
      ImgPath: this.market.ImgPath,
      ContenTypeShort: this.market.ContenTypeShort,
      ContenTypeLong: this.market.ContenTypeLong,
      CreationDate: this.market.CreationDate,
      CreatorUserId: this.market.CreatorUserId,
      CreationTime: this.market.CreationTime,
      LastModifierUserId: this.market.LastModifierUserId,
      LastModificationTime: this.market.LastModificationTime,
      DeleterUserId: this.market.DeleterUserId,
      DeletionTime: this.market.DeletionTime,
      IsActive: this.market.IsActive,
      IsDeleted: this.market.IsDeleted
    };


    this.marketService.update(data).subscribe((response: Iresponse) => {
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
        this.marketService.delete(id).subscribe((response: Iresponse) => {
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


  //init create from
  initCreateFrom() {
    this.createForm = this.form.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      currencyId: ['', Validators.required],
      marketTypeId: ['', Validators.required],
      conditionId: ['', Validators.required],
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      ubication: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  //init edit from
  initEditFrom() {
    this.editForm = this.form.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      currencyId: ['', Validators.required],
      marketTypeId: ['', Validators.required],
      conditionId: ['', Validators.required],
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      ubication: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }


}
