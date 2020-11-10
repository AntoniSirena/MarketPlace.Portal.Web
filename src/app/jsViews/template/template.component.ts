import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateService } from '../../services/template/template.service';
import { Template } from '../../models/template/template';
import { Itemplate } from '../../interfaces/Itemplate/itemplate';
import { Iresponse } from '../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
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
export class TemplateComponent implements OnInit {

  editTemplateForm: FormGroup;

  _currentPage: number = 1;

  templates = new Array<Template>();
  template = new Template();

  public editorValue: string = '<html> <head> <title></title> </head> <body> <p style="text-align:center"><span style="font-size:20px"><strong><u>Misi&oacute;n</u></strong></span></p> <p style="text-align:center">&nbsp;</p> <p style="text-align:center"><span style="font-size:20px"><strong><u><a href="https://www.google.com/url?sa=i&amp;url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FEscudo_de_la_Rep%25C3%25BAblica_Dominicana&amp;psig=AOvVaw37iEXX3n1FmqvqYkLcKF0W&amp;ust=1596003081055000&amp;source=images&amp;cd=vfe&amp;ved=0CAIQjRxqFwoTCID2qfik7-oCFQAAAAAdAAAAABAP"><img alt="Escudo.Dom" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Coat_of_arms_of_the_Dominican_Republic.svg/800px-Coat_of_arms_of_the_Dominican_Republic.svg.png" style="border-style:solid; border-width:1px; height:220px; margin-left:375px; margin-right:375px; width:220px" /></a></u></strong></span></p> <p style="text-align:center">El&nbsp;<strong>Escudo de armas de la&nbsp;<a href="https://es.wikipedia.org/wiki/Rep%C3%BAblica_Dominicana" title="República Dominicana">Rep&uacute;blica Dominicana</a></strong>&nbsp;es el emblema her&aacute;ldico que representa al pa&iacute;s y que, junto con la&nbsp;<a href="https://es.wikipedia.org/wiki/Bandera_de_la_Rep%C3%BAblica_Dominicana" title="Bandera de la República Dominicana">Bandera</a>&nbsp;y el&nbsp;<a href="https://es.wikipedia.org/wiki/Himno_nacional_de_la_Rep%C3%BAblica_Dominicana" title="Himno nacional de la República Dominicana">Himno Nacional</a>, tiene la categor&iacute;a de s&iacute;mbolo patrio.</p> <p style="text-align:center">La existencia del escudo est&aacute; consagrada en la constituci&oacute;n de la rep&uacute;blica, que lo describe de la manera siguiente:</p> <p style="text-align:center"><strong>Art&iacute;culo 32.</strong>- El Escudo Nacional tiene los mismos colores de la Bandera Nacional dispuestos en igual forma. Lleva en el centro la Biblia abierta en el Evangelio de San Juan cap&iacute;tulo 8, vers&iacute;culo 32 y encima una cruz, lo cual surge de un trofeo integrado por dos lanzas y cuatro banderas nacionales sin escudo, dispuestas a ambos lados; lleva un ramo de&nbsp;<strong>laurel</strong>&nbsp;del lado izquierdo y uno de palma al lado derecho. Est&aacute; coronado por una cinta azul ultramar en la cual se lee el lema &ldquo;Dios Patria Libertad&rdquo;. En la base hay otra cinta de color rojo bermell&oacute;n&nbsp;<strong>cuyos extremos se orientan hacia arriba</strong>&nbsp;con las palabras &ldquo;Rep&uacute;blica Dominicana&rdquo;. La forma del Escudo Nacional es de un cuadrilongo, con los &aacute;ngulos superiores salientes y los inferiores redondeados, el centro de cuya base termina en punta, y est&aacute; dispuesto en forma tal que resulte un cuadrado perfecto al trazar una l&iacute;nea horizontal que una las dos verticales del cuadrilongo desde donde comienzan los &aacute;ngulos inferiores.</p> <p style="text-align:center">&nbsp;</p> </body> </html>';


  //constructor
  constructor(
    private templateService: TemplateService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }


  ngOnInit() {
    this.getTemplates();
  }



  getTemplates() {
    this.templateService.getTemplates().subscribe((response: Array<Template>) => {
      this.templates = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getTemplateById(id: number) {
    this.templateService.getTemplateById(id).subscribe((response: Template) => {
      this.template = response;

      //llenando el modal
      this.editTemplateForm = this.form.group({
        id: [`${this.template.Id}`, Validators.required],
        operation: [`${this.template.Operation}`],
        shortName: [`${this.template.ShortName}`, Validators.required],
        name: [`${this.template.Name}`, Validators.required],
        description: [`${this.template.Description}`, Validators.required],
        body: [`${this.template.Body}`, Validators.required],
        enabled: [this.template.Enabled],
      });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  
  enabledTrue() {
    this.template.Enabled = true;
  }

  enabledFalse() {
    this.template.Enabled = false;
  }


  //open edit modal
  openEditModal(editModal, id: number) {
    this.getTemplateById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'xl' });
  }

  //edit
  edit(formValue: any) {

    const template: Itemplate = {
      Id: this.template.Id,
      Description: formValue.description,
      ShortName: formValue.shortName,
      Operation: formValue.operation,
      Name: formValue.name,
      Body: formValue.body,
      Enabled: formValue.enabled,
      CreationTime: this.template.CreationTime,
      CreatorUserId: this.template.CreatorUserId,
      LastModificationTime: this.template.LastModificationTime,
      LastModifierUserId: this.template.LastModifierUserId,
      DeleterUserId: this.template.DeleterUserId,
      DeletionTime: this.template.DeletionTime,
      IsActive: this.template.IsActive,
      IsDeleted: this.template.IsDeleted
    };

    this.templateService.editTemplate(template).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getTemplates();
          this.modalService.dismissAll();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }


  //edit from set value ''
  setValueEditFrom() {
    this.editTemplateForm = this.form.group({
      id: [0, Validators.required],
      operation: [''],
      name: ['', Validators.required],
      shortName: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      enabled: [false]
    });
  }

}
