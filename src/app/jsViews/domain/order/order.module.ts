import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//spinner
import { NgxSpinnerModule } from "ngx-spinner"

//ng-Pagination
import { NgxPaginationModule } from 'ngx-pagination';

//ng-Search
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//ng-select
import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing';
import { InboxComponent } from './inbox/inbox.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProviderOrderComponent } from './provider-order/provider-order.component';



@NgModule({
  declarations: [
    OrderComponent,
    InboxComponent,
    OrderHistoryComponent,
    ProviderOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    
  ]
})
export class OrderModule { }
