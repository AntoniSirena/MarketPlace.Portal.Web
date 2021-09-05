
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderComponent } from './order.component';


const routes: Routes = [
    {
        path: 'shoppingCart',
        component: OrderComponent,
        data: {
            title: 'Detalles de mi carrito'
        },
    },
    {
        path: 'inbox',
        component: InboxComponent,
        data: {
            title: 'Bandeja de entrada'
        },
    },
    {
        path: 'history',
        component: OrderHistoryComponent,
        data: {
            title: 'Historico de orden'
        },
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class OrderRoutingModule {

}