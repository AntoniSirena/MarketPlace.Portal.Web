
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortadaComponent } from './portada.component';


const routes: Routes = [
    {
        path: '',
        component: PortadaComponent,
        data: {
            title: 'Whatsapp: 829-909-3042, Correo: jssoluctech@gmail.com'
        }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortadaRoutingModule {

}