import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketService } from './../../../../services/domain/market/market.service';
import { Category, Condition, Currency, Market, MarketType, ProductType, SubCategory } from '../../../../models/domain/market/market';
import { BaseService } from '../../../../services/base/base.service';
import { User } from '../../../../models/profile/profile';
import { Imarket } from '../../../../interfaces/domain/imarket/imarket';
import { Iresponse } from './../../../../interfaces/Iresponse/iresponse';
import { environment } from '../../../../environments/environment';
import { CommonService } from './../../../../services/common/common.service';


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

  coreURL = environment.coreURL;

  imageQuantityMarketDetail: number = 0;

  currencies = new Array<Currency>();
  marketTypes = new Array<MarketType>();
  conditions = new Array<Condition>();
  categories = new Array<Category>();
  subCategories = new Array<SubCategory>();
  productTypes = new Array<ProductType>();

  markets = new Array<Market>();
  market = new Market();

  userData = new User();

  inputFiles: any = '';
  inputFilesMultiple = [];
  validateImg: boolean;

  buttonSave: boolean;

  //Permissions
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;

  enableShoppingCart: boolean;


  constructor(private modalService: NgbModal,
    private form: FormBuilder,
    private marketService: MarketService,
    private baseService: BaseService,
    private commonService: CommonService) {
    //Load permissions
    this.userData = this.baseService.getUserData();
    this.canCreate = this.userData.CanCreate;
    this.canEdit = this.userData.CanEdit;
    this.canDelete = this.userData.CanDelete;
    this.buttonSave = true;
  }

  ngOnInit(): void {
    this.enableShoppingCart = this.userData.EnableShoppingCart;
    this.getCurrencies();
    this.getMarketTypes();
    this.getConditions();
    this.getCategories();
    this.getProductTypes();
    this.getAll();
    this.getImageQuantityMarketDetail();
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

  removeImg(index: number){
    this.inputFilesMultiple.splice(index, 1);
  }

  getCurrencies() {
    this.marketService.getCurrencies().subscribe((response: Array<Currency>) => {
      this.currencies = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getProductTypes() {
    this.marketService.getProductTypes().subscribe((response: Array<ProductType>) => {
      this.productTypes = response;
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

  getSubCategories_ByCategoryId(event: any) {
    let id;
    if(event?.Id){
      id = event.Id;
    }else{
      id = event;
    }

    if(event){
      this.marketService.getSubCategories(id).subscribe((response: Array<SubCategory>) => {
        this.subCategories = response;
      },
        error => {
          console.log(JSON.stringify(error));
        });
    }

  }


  getImageQuantityMarketDetail() {
    this.commonService.getConfigurationParameter('MaximumImgQuantityMarketDetail').subscribe((response: any) => {
      this.imageQuantityMarketDetail = response;
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
        price: [this.market.Price],
        currencyId: [this.market.CurrencyId, Validators.required],
        marketTypeId: [this.market.MarketTypeId, Validators.required],
        conditionId: [this.market.ConditionId, Validators.required],
        categoryId: [this.market.CategoryId, Validators.required],
        subCategoryId: [this.market.SubCategoryId, Validators.required],
        ubication: [this.market.Ubication, Validators.required],
        description: [this.market.Description],
        phoneNumber: [this.market.PhoneNumber],
        productTypeId: [this.market.ProductTypeId, Validators.required ],
        useStock: [this.market.UseStock],
        stock: [this.market.Stock],
        minQuantity: [this.market.MinQuantity],
        maxQuantity: [this.market.MaxQuantity],

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
    this.buttonSave = true;
    this.modalService.open(createModal, { size: 'lg', backdrop: 'static', scrollable: true });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.initEditFrom();
    this.buttonSave = true;
    this.getById(editModal, id);
  }

  useStock(flag: number) {
    if(flag === 1){
      this.market.UseStock = true;
    }else{
      this.market.UseStock = false;
    }
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
      Description: formValue.description,
      PhoneNumber: 0,
      Img: this.market.Img,
      ImgPath: null,
      ContenTypeShort: null,
      ContenTypeLong: null,
      CreationDate: null,
      ProductTypeId: formValue.productTypeId,
      UseStock: this.market.UseStock,
      Stock: formValue.stock,
      MinQuantity: formValue.minQuantity,
      MaxQuantity: formValue.maxQuantity,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null,
      IsActive: true,
      IsDeleted: false
    };

    this.buttonSave = false;
    this.marketService.create(data, this.inputFilesMultiple).subscribe((response: Iresponse) => {
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
          this.market.Img = '';
          this.inputFilesMultiple = [];
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 10000
        }).then(() => {
          this.buttonSave = true;
        });
      }
    },
      error => {
        this.buttonSave = true;
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
      Description: formValue.description,
      PhoneNumber: 0,
      Img: this.market.Img,
      ImgPath: this.market.ImgPath,
      ContenTypeShort: this.market.ContenTypeShort,
      ContenTypeLong: this.market.ContenTypeLong,
      CreationDate: this.market.CreationDate,
      ProductTypeId: formValue.productTypeId,
      UseStock: this.market.UseStock,
      Stock: formValue.stock,
      MinQuantity: formValue.minQuantity,
      MaxQuantity: formValue.maxQuantity,
      CreatorUserId: this.market.CreatorUserId,
      CreationTime: this.market.CreationTime,
      LastModifierUserId: this.market.LastModifierUserId,
      LastModificationTime: this.market.LastModificationTime,
      DeleterUserId: this.market.DeleterUserId,
      DeletionTime: this.market.DeletionTime,
      IsActive: this.market.IsActive,
      IsDeleted: this.market.IsDeleted
    };

    this.buttonSave = false;
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
          this.inputFilesMultiple = [];
          this.inputFiles = '';
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 10000
        }).then(() => {
          this.buttonSave = true;
        });
      }
    },
      error => {
        this.buttonSave = true;
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
      cancelButtonText: 'Cancelar',
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
      price: [0],
      currencyId: [this.currencies.filter(x => x.ShortName === 'DOP')[0].Id, Validators.required],
      marketTypeId: ['', Validators.required],
      conditionId: ['', Validators.required],
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      ubication: ['', Validators.required],
      description: [''],
      phoneNumber: [0],
      productTypeId: [this.productTypes.filter(x => x.ShortName === 'Product')[0].Id, Validators.required ],
      useStock: [false],
      stock: [1],
      minQuantity: [0],
      maxQuantity: [0],
    });
  }

  //init edit from
  initEditFrom() {
    this.editForm = this.form.group({
      title: ['', Validators.required],
      price: [0],
      currencyId: ['', Validators.required],
      marketTypeId: ['', Validators.required],
      conditionId: ['', Validators.required],
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      ubication: ['', Validators.required],
      description: [''],
      phoneNumber: [0],
      productTypeId: [0, Validators.required ],
      useStock: [false],
      stock: [0],
      minQuantity: [0],
      maxQuantity: [0],
    });
  }

}
