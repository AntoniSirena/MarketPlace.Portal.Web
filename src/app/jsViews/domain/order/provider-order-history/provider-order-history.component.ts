import { Component, OnInit } from '@angular/core';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { OrderDetailItemDTO } from '../../../../models/domain/order';
import { OrderService } from './../../../../services/domain/order/order.service';

@Component({
  selector: 'app-provider-order-history',
  templateUrl: './provider-order-history.component.html',
  styleUrls: ['./provider-order-history.component.css']
})
export class ProviderOrderHistoryComponent implements OnInit {

  
  orders = new Array<OrderDetailItemDTO>();

  _currentPage: number = 1;

  constructor(
    private orderService: OrderService,
  ) { }


  ngOnInit(): void {
    this.getProviderOrderHistory();
  }

  getProviderOrderHistory() {
    this.orderService.getProviderOrderHistory().subscribe((response: Iresponse) => {
      this.orders = response.Data;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

}
