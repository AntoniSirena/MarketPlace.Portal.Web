import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//spinner
import { NgxSpinnerModule } from "ngx-spinner"

//ng-select
import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ]
})
export class OrderModule { }
