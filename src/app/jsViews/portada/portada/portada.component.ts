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
    //'assets/img/portada/PadrePatría.jpg',
    //'assets/img/portada/Dist1007.jpg',
    'assets/img/portada/Dist1007_1.jpg',
    //'assets/img/portada/utileria.jpg',
    //'assets/img/portada/acompañamiento.jpg',
    //'assets/img/portada/merito.jpg',
  ];

  isLogin: Boolean = false;

  @ViewChild('misionModal') misionModal: ElementRef;
  @ViewChild('visionModal') visionModal: ElementRef;
  @ViewChild('valoresModal') valoresModal: ElementRef;
  @ViewChild('planEstrategicoModal') planEstrategicoModal: ElementRef;


  public editorValue: string = '<html> <head> <title></title> </head> <body> <p style="text-align:center">&nbsp;</p> <p style="text-align:center">El&nbsp;<strong>Escudo de armas de la&nbsp;<a href="https://es.wikipedia.org/wiki/Rep%C3%BAblica_Dominicana" title="República Dominicana">Rep&uacute;blica Dominicana</a></strong>&nbsp;es el emblema her&aacute;ldico que representa al pa&iacute;s y que, junto con la&nbsp;<a href="https://es.wikipedia.org/wiki/Bandera_de_la_Rep%C3%BAblica_Dominicana" title="Bandera de la República Dominicana">Bandera</a>&nbsp;y el&nbsp;<a href="https://es.wikipedia.org/wiki/Himno_nacional_de_la_Rep%C3%BAblica_Dominicana" title="Himno nacional de la República Dominicana">Himno Nacional</a>, tiene la categor&iacute;a de s&iacute;mbolo patrio.</p> <p style="text-align:center">La existencia del escudo est&aacute; consagrada en la constituci&oacute;n de la rep&uacute;blica, que lo describe de la manera siguiente:</p> <p style="text-align:center"><strong>Art&iacute;culo 32.</strong>- El Escudo Nacional tiene los mismos colores de la Bandera Nacional dispuestos en igual forma. Lleva en el centro la Biblia abierta en el Evangelio de San Juan cap&iacute;tulo 8, vers&iacute;culo 32 y encima una cruz, lo cual surge de un trofeo integrado por dos lanzas y cuatro banderas nacionales sin escudo, dispuestas a ambos lados; lleva un ramo de&nbsp;<strong>laurel</strong>&nbsp;del lado izquierdo y uno de palma al lado derecho. Est&aacute; coronado por una cinta azul ultramar en la cual se lee el lema &ldquo;Dios Patria Libertad&rdquo;. En la base hay otra cinta de color rojo bermell&oacute;n&nbsp;<strong>cuyos extremos se orientan hacia arriba</strong>&nbsp;con las palabras &ldquo;Rep&uacute;blica Dominicana&rdquo;. La forma del Escudo Nacional es de un cuadrilongo, con los &aacute;ngulos superiores salientes y los inferiores redondeados, el centro de cuya base termina en punta, y est&aacute; dispuesto en forma tal que resulte un cuadrado perfecto al trazar una l&iacute;nea horizontal que una las dos verticales del cuadrilongo desde donde comienzan los &aacute;ngulos inferiores.</p> <p style="text-align:center">&nbsp;</p> </body> </html>';

  portada = new Portada();

  leftInfo = new Portada();
  rightInfo = new Portada();
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
    this.getTemplateLeftInfo('LeftInfo');
    this.getTemplateRightInfo('RightInfo');

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

  //Get template right info
  getTemplateRightInfo(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.rightInfo = response.Data;
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

  //Get template right left
  getTemplateLeftInfo(operation: string) {
    this.portadaService.getTemplateByOperation(operation).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        this.leftInfo = response.Data;
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


  //open valores modal
  openPlanEstrategicoModal(operation: string) {
    this.getTemplate(operation);
    this.modalService.open(this.planEstrategicoModal, { size: 'xl', scrollable: true });
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
