import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { SizeImageArticle } from '../../../../configurations/jsConfig';
import { environment } from '../../../../environments/environment';
import { Article, ArticleData, ArticleFullData, ImgDetail } from '../../../../models/domain/market/market';
import { MarketService } from '../../../../services/domain/market/market.service';
import { Router } from '@angular/router';
import { Profile, User } from '../../../../models/profile/profile';
import { BaseService } from '../../../../services/base/base.service';
import { Category, SubCategory } from '../../../../models/domain/market/market';
import { SizeImageDetailArticle, SizeImageSeller } from './../../../../configurations/jsConfig';
import { ICreateOrder } from './../../../../interfaces/domain/order';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { OrderService } from '../../../../services/domain/order/order.service';


@Component({
  selector: 'app-view-market',
  templateUrl: './view-market.component.html',
  styleUrls: ['./view-market.component.css'],
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
export class ViewMarketComponent implements OnInit {

  @ViewChild('toPostModal') toPostModal: ElementRef;
  @ViewChild('articleDetailModal') articleDetailModal: ElementRef;
  @ViewChild('buyArticle') buyArticleModal: ElementRef;


  _currentPage: number = 1;

  filterSellForm: FormGroup;
  filterRentForm: FormGroup;

  articles = new Array<Article>();
  currentArticle = new Article();
  articleFullData = new ArticleFullData();
  itemQuantity: number;

  coreURL = environment.coreURL;

  show_btn_vieMore: boolean = true;

  enableShoppingCart: boolean;

  img_Width = SizeImageArticle.width;
  img_height = SizeImageArticle.height;

  imgDetail_Width = SizeImageDetailArticle.width;
  imgDetail_height = SizeImageDetailArticle.height;

  imageSeller_Width = SizeImageSeller.width;
  imageSeller_height = SizeImageSeller.height;

  currentArticleQuantity: number = 0;
  itemNote: string;
  showButtonDeleteItem: boolean;
  provider: string;
  providerPhoneNumber: string;

  userData = new User();

  timerInputStr: any = 0;

  inputStr: string;
  recordResultMessage: string;

  categories = new Array<Category>();
  subCategories = new Array<SubCategory>();

  categoryId: number = 0;
  subCategoryId: number = 0;

  currentPage: number;
  currentPageAdvancedSearch: number;
  currentPageSearchStr: number;

  public profile = new Profile();

  constructor(
    private form: FormBuilder,
    private marketService: MarketService,
    private modalService: NgbModal,
    private routerService: Router,
    private baseService: BaseService,
    private spinnerService: NgxSpinnerService,
    private orderService: OrderService,
  ) {

  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.currentPageAdvancedSearch = 1;
    this.currentPageSearchStr = 1;

    this.userData = this.baseService.getUserData();
    this.enableShoppingCart = this.userData.EnableShoppingCart;

    this.initFilterSellFrom();
    this.initFilterRentFrom();
    this.getArticles('Sell', 0, 0, this.currentPage);
    this.getCategories();
    this.goUp();
  }



  goUp() {
    $(document).ready(function () {
      $('.ir-arriba').click(function () {
        $('body, html').animate({
          scrollTop: '0px'
        }, 300);
      });

      $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
          $('.ir-arriba').slideDown(300);
        } else {
          $('.ir-arriba').slideUp(300);
        }
      });

    });
  }

  getArticles(marketType: string, categoryId: number, subCategoryId: number, page: number) {
    this.spinnerService.show();
    this.show_btn_vieMore = true;
    this.inputStr = '';
    this.marketService.getArticles(marketType, categoryId, subCategoryId, page).subscribe((response: ArticleData) => {
      this.spinnerService.hide();

      this.articles = response.Article;
      this.itemQuantity = response.TotalRecord;

      if (this.articles.length <= 1) {
        this.recordResultMessage = 'registro encontrado'
      }

      if (this.articles.length > 1) {
        this.recordResultMessage = 'registros encontrados'
      }

      if (response.TotalRecord === response.TotalRecordByPage) {
        this.show_btn_vieMore = false;
      }

    },
      error => {
        this.spinnerService.hide();
        console.log(JSON.stringify(error));
      });
  }

  resetPage() {
    this.currentPage = 1;
    this.currentPageAdvancedSearch = 1;
    this.currentPageSearchStr = 1;
  }


  getArticleFullData(article: Article) {
    this.spinnerService.show();
    this.currentArticle = article;

    this.marketService.getArticleFullData(article.Id).subscribe((response: ArticleFullData) => {
      this.articleFullData = response;
      this.spinnerService.hide();

      this.modalService.open(this.articleDetailModal, { size: 'xl', scrollable: true, backdrop: 'static' });
    },
      error => {
        this.spinnerService.hide();
        console.log(JSON.stringify(error));
      });
  }


  getArticlesByInputStr(marketType: string, inputStr: string, page: number) {
    this.spinnerService.show();
    this.show_btn_vieMore = true;

    this.marketService.getArticlesByInputStr(marketType, inputStr, page).subscribe((response: ArticleData) => {
      this.spinnerService.hide();

      this.articles = response.Article;
      this.itemQuantity = response.TotalRecord;

      if (this.articles.length <= 1) {
        this.recordResultMessage = 'registro encontrado'
      }

      if (this.articles.length > 1) {
        this.recordResultMessage = 'registros encontrados'
      }

      if (response.TotalRecord === response.TotalRecordByPage) {
        this.show_btn_vieMore = false;
      }

    },
      error => {
        this.spinnerService.hide();
        console.log(JSON.stringify(error));
      });
  }

  getArticlesByInputStrByTime(marketType: string, inputStr: string) {
    clearTimeout(this.timerInputStr);
    this.timerInputStr = setTimeout(() => {
      this.currentPageSearchStr = 1;
      this.getArticlesByInputStr(marketType, inputStr, this.currentPageSearchStr);
    }, 1000);
  }

  viewMoreArticles(marketType: string) {

    if (this.categoryId || this.subCategoryId) {
      this.currentPageAdvancedSearch = this.currentPageAdvancedSearch + 1;
      this.getArticles(marketType, this.categoryId, this.subCategoryId, this.currentPageAdvancedSearch);
    } else if (this.inputStr) {
      this.currentPageSearchStr = this.currentPageSearchStr + 1;
      this.getArticlesByInputStr(marketType, this.inputStr, this.currentPageSearchStr);
    }
    else {
      this.currentPage = this.currentPage + 1;
      this.getArticles(marketType, 0, 0, this.currentPage);
    }

  }

  filterArticles(marketType, form) {
    let categoryId = 0;
    let subCategoryId = 0;

    if (form.categoryId > 0) {
      categoryId = form.categoryId
    }
    if (form.subCategoryId > 0) {
      subCategoryId = form.subCategoryId
    }

    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;

    this.currentPageAdvancedSearch = 1;

    this.getArticles(marketType, categoryId, subCategoryId, this.currentPageAdvancedSearch);
  }

  getSubCategories_ByCategoryId(event) {
    if (event) {
      this.marketService.getSubCategories(event.Id).subscribe((response: Array<SubCategory>) => {
        this.subCategories = response;
      },
        error => {
          console.log(JSON.stringify(error));
        });
    }
  }


  getCategories() {
    this.marketService.getCategories().subscribe((response: Array<Category>) => {
      this.categories = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  toPost() {
    if (this.userData.IsVisitorUser) {
      this.modalService.open(this.toPostModal, { size: 'sm-lg', scrollable: true, backdrop: 'static' });
    } else {
      this.routerService.navigate(['market']);
    }
  }

  goToLoginPage() {
    this.modalService.dismissAll();
    this.routerService.navigate(['login']);
  }

  goToRegisterPage() {
    this.modalService.dismissAll();
    this.routerService.navigate(['register']);
  }

  openModalAddArticle(article: Article) {

    if (this.userData.IsVisitorUser) {
      this.modalService.open(this.toPostModal, { size: 'sm-lg', scrollable: true, backdrop: 'static' });
    } else {
      this.modalService.dismissAll();

      this.orderService.getCurrentArticleQuantity(article.Id).subscribe((response: any) => {
        this.currentArticleQuantity = response.Quantity;
        this.showButtonDeleteItem = response.ShowButtonDeleteItem;
        this.itemNote = response.ItemNote;
        this.provider = response.Provider;
        this.providerPhoneNumber = response.PhoneNumber;

        this.modalService.open(this.buyArticleModal, { size: 'sm-lg', scrollable: true, backdrop: 'static' });
        this.currentArticle = article;
      },
        error => {
          console.log(JSON.stringify(error));
        });
    }

  }


  addArticle(article: Article, quantity: number, itemNote?: string) {

    if (!this.currentArticleQuantity) {
      Swal.fire({
        icon: 'warning',
        title: `Favor ingrese la cantidad que desea comprar`,
        showConfirmButton: true,
        timer: 6000
      }).then(() => {
      });

      return;
    }

    if (this.currentArticleQuantity < this.currentArticle.MinQuantity && this.currentArticle.MinQuantity) {
      Swal.fire({
        icon: 'warning',
        title: `La cantidad a comprar debe ser igual ó mayor a ${this.currentArticle.MinQuantity}`,
        showConfirmButton: true,
        timer: 6000
      }).then(() => {
      });

      return;
    }

    if (this.currentArticleQuantity > this.currentArticle.MaxQuantity && this.currentArticle.MaxQuantity) {
      Swal.fire({
        icon: 'warning',
        title: `La cantidad a comprar debe ser menor ó igual a ${this.currentArticle.MaxQuantity}`,
        showConfirmButton: true,
        timer: 6000
      }).then(() => {
      });

      return;
    }

    if (this.currentArticleQuantity > this.currentArticle.Stock && this.currentArticle.UseStock) {
      Swal.fire({
        icon: 'warning',
        title: `Este producto no tiene la cantidad suficiente para venderle ${this.currentArticleQuantity}. Existencia actual ${this.currentArticle.Stock}`,
        showConfirmButton: true,
        timer: 8000
      }).then(() => {
      });

      return;
    }

    const data: ICreateOrder = {
      ArticleId: article.Id,
      OrderId: 0,
      Quantity: quantity,
      ItemNote: itemNote,
    }
    
    this.orderService.create(data).subscribe((response: Iresponse) => {
      
      if (response.Code === '000') {

        this.showButtonDeleteItem = response.Data.ShowButtonDeleteItem;

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {

        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 7000
        }).then(() => {
        });
      }

    },
      error => {
        console.log(JSON.stringify(error));
      });

  }


  deleteArticle(article: Article) {

    Swal.fire({
      title: 'Esta seguro que desea eliminar este artículo del carrito ?',
      text: "El mismo podra ser agregado nuevamente",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.orderService.deleteArticle(article.Id).subscribe((response: Iresponse) => {
      
          if (response.Code === '000') {
  
            this.currentArticleQuantity = 0;
            this.showButtonDeleteItem = response.Data.ShowButtonDeleteItem;

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
    
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: response.Message,
              showConfirmButton: true,
              timer: 7000
            }).then(() => {
            });
          }
    
        },
          error => {
            console.log(JSON.stringify(error));
          });

      }
    })

  }


  //init filter sell from
  initFilterSellFrom() {
    this.filterSellForm = this.form.group({
      categoryId: [''],
      subCategoryId: [''],
    });
  }


  //init filter rent from
  initFilterRentFrom() {
    this.filterRentForm = this.form.group({
      categoryId: [''],
      subCategoryId: [''],
    });
  }

}
