import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { OrderDetailDTO, OrderDetailItemDTO, OrderInboxDTO } from '../../../../models/domain/order';
import { OrderService } from '../../../../services/domain/order.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ICreateOrder } from '../../../../interfaces/domain/order';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {


  @ViewChild('orderDetailModal') orderDetailModal: ElementRef;
  @ViewChild('buyArticle') buyArticleModal: ElementRef;


  coreURL = environment.coreURL;

  orders = new Array<OrderInboxDTO>();
  orderDetail = new OrderDetailDTO();

  currentArticle = new OrderDetailItemDTO();
  orderDetailEmpty: any;

  currentArticleQuantity: number;
  itemNote: string;
  showButtonDeleteItem: boolean;


  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
  ) { }


  ngOnInit(): void {
    this.inbox();
  }


  inbox(statusId: number = 0) {
    this.orderService.inbox().subscribe((response: Iresponse) => {
      this.orders = response.Data;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  openOrderDetail(orderId: number) {

    this.orderService.getShoppingCart(orderId).subscribe((response: Iresponse) => {

      this.orderDetail = response.Data;

      this.modalService.dismissAll();
      this.modalService.open(this.orderDetailModal, { size: 'xl', scrollable: true, backdrop: 'static' });

    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getCurrentOrder(orderId: number) {

    this.orderService.getShoppingCart(orderId).subscribe((response: Iresponse) => {
      this.orderDetail = response.Data;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  confirmOrder() {

    Swal.fire({
      title: `Esta seguro que usted contacto al cliente para confirmar la orden ?`,
      text: "La misma no podra ser revertida",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, contactar el cliente',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Confirmar!'
    }).then((result) => {
      if (result.value) {

        alert(true)

      }
    })

  }


  openModalAddArticle(article: OrderDetailItemDTO) {

    this.orderService.getCurrentArticleQuantity(article.ArticleId, this.orderDetail.Id).subscribe((response: any) => {
      this.currentArticleQuantity = response.Quantity;
      this.showButtonDeleteItem = response.ShowButtonDeleteItem;
      this.itemNote = response.ItemNote;

      this.modalService.open(this.buyArticleModal, { size: 'sm-lg', scrollable: true, backdrop: 'static' });
      this.currentArticle = article;
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }


  addArticle(article: OrderDetailItemDTO, quantity: number, itemNote?: string) {

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
      ArticleId: article.ArticleId,
      OrderId: this.orderDetail.Id,
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
          this.getCurrentOrder(this.orderDetail.Id);
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


  deleteArticle(article: OrderDetailItemDTO) {

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

        this.orderService.deleteArticle(article.ArticleId, this.orderDetail.Id).subscribe((response: Iresponse) => {

          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getCurrentOrder(this.orderDetail.Id);
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


  cancelOrder(){
    
  }


}
