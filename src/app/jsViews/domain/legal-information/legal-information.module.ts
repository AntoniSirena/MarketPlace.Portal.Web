import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { LegalInformationRoutingModule } from './legal-information-routing';



@NgModule({
  declarations: [
    TermsConditionsComponent,
  ],
  imports: [
    CommonModule,
    LegalInformationRoutingModule,
  ]
})
export class LegalInformationModule { }
