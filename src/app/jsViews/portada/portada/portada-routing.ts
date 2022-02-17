
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailComponent } from '../../domain/itemDetail/item-detail/item-detail.component';
import { PortadaComponent } from './portada.component';


const routes: Routes = [
    {
        path: '',
        component: PortadaComponent,
        data: {
            title: 'Whatsapp: 829-909-3042, Correo: jssoluctech@gmail.com'
        }
    },
    {
        path: 'item-detail/:itemId',
        component: ItemDetailComponent,
        data: {
            title: ''
        }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortadaRoutingModule {

}