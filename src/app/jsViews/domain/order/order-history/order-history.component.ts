import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { OrderDetailDTO } from '../../../../models/domain/order';
import { OrderService } from '../../../../services/domain/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  @ViewChild('orderDetailModal') orderDetailModal: ElementRef;

  
  _currentPage: number = 1;

  orders = new Array<OrderDetailDTO>();
  orderDetail = new OrderDetailDTO();

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
  ) { }


  ngOnInit(): void {
    this.getOrderHistory();
  }



  getOrderHistory(){  
    this.orderService.getOrderHistory().subscribe((response: Iresponse) => {
      this.orders = response.Data;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  openModalOrderDetail(orderId: number) {

    this.orderService.getShoppingCart(orderId).subscribe((response: Iresponse) => {

      this.orderDetail = response.Data;

      this.modalService.dismissAll();
      this.modalService.open(this.orderDetailModal, { size: 'xl', scrollable: true, backdrop: 'static' });

    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


}
