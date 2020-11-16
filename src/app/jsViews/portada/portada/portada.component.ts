import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Ilogin } from '../../../interfaces/Ilogin/ilogin';
import { RedirectService } from '../../../services/redirect/redirect.service';
import { Router } from '@angular/router';
import { PortadaService } from '../../../services/portada/portada.service';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';
import { Portada } from '../../../models/portada/portada';
import { NoveltiesByType } from '../../../models/novelty/novelty';


@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class PortadaComponent implements OnInit {


  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [
    'assets/img/portada/SAGuerra_ParqueEcológico.jpg'
  ];

  isLogin: Boolean = false;

  @ViewChild('misionModal') misionModal: ElementRef;
  @ViewChild('visionModal') visionModal: ElementRef;
  @ViewChild('valoresModal') valoresModal: ElementRef;
  @ViewChild('farmaceModal') farmaceModal: ElementRef;
  @ViewChild('beautyStyleModal') beautyStyleModal: ElementRef;
  @ViewChild('mobileComputerStores') mobileComputerStores: ElementRef;
  @ViewChild('foodModal') foodModal: ElementRef;
  @ViewChild('supermarketProvisionsModal') supermarketProvisionsModal: ElementRef;
  @ViewChild('hardwareStoreReplacementModal') hardwareStoreReplacementModal: ElementRef;
  @ViewChild('historyGuerraModal') historyGuerraModal: ElementRef;


  portada = new Portada();

  leftInfo_A = new Portada();
  leftInfo_B = new Portada();
  leftInfo_C = new Portada();

  rightInfo_A = new Portada();
  rightInfo_B = new Portada();
  rightInfo_C = new Portada();

  centerInfo = new Portada();

  bannerA = new Portada();

  novelties = new Array<NoveltiesByType>();

  constructor(
    config: NgbCarouselConfig,
    private redirectService:
      RedirectService,
    private router: Router,
    private modalService: NgbModal,
    private portadaService: PortadaService) {

    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }


  ngOnInit(): void {
    this.getTemplateBannerA('BannerPortada_A');
    this.getTemplateLeftInfo_A('LeftInfo_A');
    this.getTemplateLeftInfo_B('LeftInfo_B');
    this.getTemplateLeftInfo_C('LeftInfo_C');

    this.getTemplateRightInfo_A('RightInfo_A');
    this.getTemplateRightInfo_B('RightInfo_B');
    this.getTemplateRightInfo_C('RightInfo_C');

    this.getNoveltiesByType("Science");
  }


  //Get template
  getTemplate(operation: string) {

    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.portada = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }

  //Get template right info A
  getTemplateRightInfo_A(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.rightInfo_A = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //Get template right info B
  getTemplateRightInfo_B(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.rightInfo_B = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //Get template right info C
  getTemplateRightInfo_C(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.rightInfo_C = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //Get template left A
  getTemplateLeftInfo_A(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.leftInfo_A = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //Get template left B
  getTemplateLeftInfo_B(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.leftInfo_B = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //Get template left C
  getTemplateLeftInfo_C(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.leftInfo_C = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //Get template right center
  getTemplateCenterInfo(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.centerInfo = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //Get novelties by type
  getNoveltiesByType(type: string) {
    this.portadaService.getNoveltiesByType(type).subscribe((response: Array<NoveltiesByType>) => {
      this.novelties = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //Get template banner A
  getTemplateBannerA(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.bannerA = response.Data;
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //open misión modal
  openMisionModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.misionModal, { size: 'lg', scrollable: true });
  }

  //open visión modal
  openVisionModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.visionModal, { size: 'lg', scrollable: true });
  }


  //open valores modal
  openValoresModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.valoresModal, { size: 'lg', scrollable: true });
  }


  //open farmace modal
  openFarmaceModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.farmaceModal, { size: 'xl', scrollable: true });
  }


  //open beauty style modal
  openBeautyStyleModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.beautyStyleModal, { size: 'xl', scrollable: true });
  }


  //open mobile computer stores modal
  openMobileComputerStoresModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.mobileComputerStores, { size: 'xl', scrollable: true });
  }


  //open food modal
  openFoodModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.foodModal, { size: 'xl', scrollable: true });
  }


  //open super market provisions modal
  openSupermarketProvisionsModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.supermarketProvisionsModal, { size: 'xl', scrollable: true });
  }

  //open hardware store replacement modal
  openHardwareStoreReplacementModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.hardwareStoreReplacementModal, { size: 'xl', scrollable: true });
  }


  //open history guerra modal
  openHistoryGuerraModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.historyGuerraModal, { size: 'xl', scrollable: true });
  }



  loginUserVisit() {
    const login: Ilogin = {
      UserName: 'admin',
      Password: 'admin123',
      EmailAddress: null,
      SecurityCode: '',
      Token2AF: '',
    };

    this.redirectService.SubmitLogin(login, true);
    this.router.navigate(['portada']).then(() => {
      window.location.reload();
    });
  }

}
