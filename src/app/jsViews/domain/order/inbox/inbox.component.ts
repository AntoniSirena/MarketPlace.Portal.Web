import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { OrderDetailDTO, OrderInboxDTO } from '../../../../models/domain/order';
import { OrderService } from '../../../../services/domain/order.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {


  @ViewChild('orderDetailModal') orderDetailModal: ElementRef;



  orders = new Array<OrderInboxDTO>();
  orderDetail = new OrderDetailDTO();


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


  confirmOrder(){
    
  }

}
