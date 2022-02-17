import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SizeImageDetailArticle, SizeImageSeller } from '../../../../configurations/jsConfig';
import { environment } from '../../../../environments/environment';
import { Article, ArticleFullData } from '../../../../models/domain/market/market';
import { User } from '../../../../models/profile/profile';
import { BaseService } from '../../../../services/base/base.service';
import { MarketService } from '../../../../services/domain/market/market.service';
import { OrderService } from '../../../../services/domain/order/order.service';
import { RedirectService } from '../../../../services/redirect/redirect.service';
import Swal from 'sweetalert2';
import { ICreateOrder } from '../../../../interfaces/domain/order';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @ViewChild('toPostModal') toPostModal: ElementRef;
  @ViewChild('buyArticle') buyArticleModal: ElementRef;


  coreURL = environment.coreURL;

  imgDetail_Width = SizeImageDetailArticle.width;
  imgDetail_height = SizeImageDetailArticle.height;

  imageSeller_Width = SizeImageSeller.width;
  imageSeller_height = SizeImageSeller.height;

  itemId: number;

  articleFullData = new ArticleFullData();
  currentArticle = new Article();
  currentArticleQuantity: number = 0;
  itemNote: string;
  showButtonDeleteItem: boolean;
  provider: string;
  providerPhoneNumber: string;

  userData = new User();

  constructor(
    private activatedRoute: ActivatedRoute,
    private redirectService: RedirectService,
    private marketService: MarketService,
    private modalService: NgbModal,
    private baseService: BaseService,
    private routerService: Router,
    private orderService: OrderService,

  ) { }


  ngOnInit(): void {

    this.userData = this.baseService.getUserData();
    this.itemId = JSON.parse(this.activatedRoute.snapshot.paramMap.get('itemId'));

    if (!this.userData?.IsVisitorUser) {
      this.getItem(this.itemId);
    }

    if(!this.userData || this.userData?.IsVisitorUser){
      this.redirectService.loginUserVisitador(true, false, `portada/item-detail/${this.itemId}`);
      this.getItem(this.itemId);
    }

  }



  getItem(itemId: number) {

    this.marketService.getArticleFullData(itemId).subscribe((response: ArticleFullData) => {
      this.articleFullData = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
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

  

  goToLoginPage() {
    this.modalService.dismissAll();
    this.routerService.navigate(['login']);
  }

  goToRegisterPage() {
    this.modalService.dismissAll();
    this.routerService.navigate(['register']);
  }

}
