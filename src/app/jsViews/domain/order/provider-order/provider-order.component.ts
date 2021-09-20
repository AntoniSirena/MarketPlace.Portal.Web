import { Component, OnInit } from '@angular/core';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { OrderService } from '../../../../services/domain/order.service';
import { OrderDetailItemDTO } from './../../../../models/domain/order';

@Component({
  selector: 'app-provider-order',
  templateUrl: './provider-order.component.html',
  styleUrls: ['./provider-order.component.css']
})
export class ProviderOrderComponent implements OnInit {


  orders = new Array<OrderDetailItemDTO>();

  _currentPage: number = 1;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getProviderOrder();
  }


  getProviderOrder() {
    this.orderService.getProviderOrder().subscribe((response: Iresponse) => {
      this.orders = response.Data;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


}
