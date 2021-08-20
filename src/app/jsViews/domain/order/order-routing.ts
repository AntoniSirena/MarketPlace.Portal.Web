
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';


const routes: Routes = [
    {
        path: 'shoppingCart',
        component: OrderComponent,
        data: {
            title: 'Detalles de mi carrito'
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class OrderRoutingModule {

}