
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';



const routes: Routes = [
    {
        path: 'termsConditions',
        component: TermsConditionsComponent,
        data: {
            title: 'Términos y condiciones'
        },
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class LegalInformationRoutingModule {

}
