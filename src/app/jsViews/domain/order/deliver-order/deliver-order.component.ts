import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { OrderDetailDTO, OrderInboxDTO } from '../../../../models/domain/order';
import { OrderService } from './../../../../services/domain/order/order.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-deliver-order',
  templateUrl: './deliver-order.component.html',
  styleUrls: ['./deliver-order.component.css']
})
export class DeliverOrderComponent implements OnInit {


  @ViewChild('orderDetailModal') orderDetailModal: ElementRef;

  _currentPage: number = 1;
  orderKey: string;

  orders = new Array<OrderInboxDTO>();
  orderDetail = new OrderDetailDTO();

  validateOrder: boolean;

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getOrderToDeliver();
  }


  getOrderToDeliver() {
    this.orderService.getOrderToDeliver().subscribe((response: Iresponse) => {
      this.orders = response.Data;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  openModalOrderDetail(orderId: number) {
    this.validateOrder = false;
    this.orderKey = '';
    this.orderService.getShoppingCart(orderId).subscribe((response: Iresponse) => {

      this.orderDetail = response.Data;

      this.modalService.dismissAll();
      this.modalService.open(this.orderDetailModal, { size: 'xl', scrollable: true, backdrop: 'static' });

    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  _validateOrder() {
    this.orderService.validateOrder(this.orderDetail.Id, this.orderKey).subscribe((response: Iresponse) => {

      if (response.Code === '000') {

        this.validateOrder = response.Data;

      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 5000
        });
      }

    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  updateOrderStatus(statusShortName: string) {
    this.orderService.updateOrderStatus(statusShortName, this.orderDetail.Id).subscribe((response: Iresponse) => {
      
      if (response.Code === '000') {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.modalService.dismissAll();
          this.getOrderToDeliver();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 5000
        }).then(() => {
          
        });
      }
      
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


}
