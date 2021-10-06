import { Component, OnInit } from '@angular/core';
import { Iresponse } from '../../../../interfaces/Iresponse/iresponse';
import { CommonService } from './../../../../services/common/common.service';
import { PortadaService } from './../../../../services/portada/portada.service';


@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {

  termsConditions: string;

  constructor(
    private portadaService: PortadaService,
  ) { }

  ngOnInit(): void {
    this.getTermsConditions('TermConditions');
  }


  getTermsConditions(name: string) {
    this.portadaService.getTemplateByOperation(name).subscribe((response: Iresponse) => {
      this.termsConditions = response.Data.Body;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


}
