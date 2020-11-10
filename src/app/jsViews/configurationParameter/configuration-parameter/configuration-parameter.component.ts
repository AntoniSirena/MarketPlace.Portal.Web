import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationParameterService } from '../../../services/configurationParameter/configuration-parameter.service';
import { ConfigurationParameter } from '../../../models/configurationParameter/configuration-parameter';
import { IconfigurationParameter } from '../../../interfaces/IconfigurationParameter/iconfiguration-parameter';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-configuration-parameter',
  templateUrl: './configuration-parameter.component.html',
  styleUrls: ['./configuration-parameter.component.css'],
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
export class ConfigurationParameterComponent implements OnInit {

  editConfigurationParameterForm: FormGroup;
  createConfigurationParameterForm: FormGroup;

  _currentPage: number = 1;

  configurationParameters = new Array<ConfigurationParameter>();
  configurationParameter = new ConfigurationParameter();

  //constructor
  constructor(
    private configurationParameterService: ConfigurationParameterService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }

  ngOnInit(): void {
    this.getConfigurationParameters();
    this.configurationParameter.Description = ' ';
  }


  getConfigurationParameters() {
    this.configurationParameterService.getConfigurationParameters().subscribe((response: Array<ConfigurationParameter>) => {
      this.configurationParameters = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getConfigurationParameterById(id: number) {
    this.configurationParameterService.getConfigurationParameterById(id).subscribe((response: ConfigurationParameter) => {
      this.configurationParameter = response;

      //llenando el modal
      this.editConfigurationParameterForm = this.form.group({
        id: [this.configurationParameter.Id, Validators.required],
        name: [`${this.configurationParameter.Name}`, Validators.required],
        value: [`${this.configurationParameter.Value}`, Validators.required],
        description: [`${this.configurationParameter.Description}`],
        enabled: [this.configurationParameter.Enabled],
      });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //open edit modal
  openEditModal(editModal, id: number) {
    this.getConfigurationParameterById(id);
    this.getConfigurationParameters();
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }

  //open create modal
  openCreateModal(createModal) {
    this.setValueCreateFrom();
    this.modalService.open(createModal, { size: 'lg' });
  }

  enabledTrue() {
    this.configurationParameter.Enabled = true;
  }

  enabledFalse() {
    this.configurationParameter.Enabled = false;
  }


  //edit
  edit(formValue: any) {

    const configurationParameter: IconfigurationParameter = {
      Id: this.configurationParameter.Id,
      Name: formValue.name,
      Value: formValue.value,
      Description: formValue.description,
      Enabled: this.configurationParameter.Enabled,
      CreationTime: this.configurationParameter.CreationTime,
      CreatorUserId: this.configurationParameter.CreatorUserId,
      LastModificationTime: this.configurationParameter.LastModificationTime,
      LastModifierUserId: this.configurationParameter.LastModifierUserId,
      DeleterUserId: this.configurationParameter.DeleterUserId,
      DeletionTime: this.configurationParameter.DeletionTime,
      IsActive: this.configurationParameter.IsActive,
      IsDeleted: this.configurationParameter.IsDeleted
    };

    this.configurationParameterService.editConfigurationParameter(configurationParameter).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getConfigurationParameters();
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

  //create
  create(formValue: any) {

    const configurationParameter: IconfigurationParameter = {
      Id: 0,
      Name: formValue.name,
      Value: formValue.value,
      Description: formValue.description,
      Enabled: this.configurationParameter.Enabled,
      IsActive: true,
      IsDeleted: false,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null
    };

    this.configurationParameterService.createConfigurationParameter(configurationParameter).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getConfigurationParameters();
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

  //delete
  delete(id: number) {

    Swal.fire({
      title: 'Esta seguro que desea eliminar el registro ?',
      text: "Los cambios no podran ser revertidos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        //delete service
        this.configurationParameterService.delete(id).subscribe((response: Iresponse) => {
          if (response.Code === '000') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.Message,
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              this.getConfigurationParameters();
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
    })
  }

  //edit from set value ''
  setValueEditFrom() {
    this.editConfigurationParameterForm = this.form.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      value: ['', Validators.required],
      description: [''],
      enabled: [false],
    });
  }

  //create from set value ''
  setValueCreateFrom() {
    this.createConfigurationParameterForm = this.form.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      value: ['', Validators.required],
      description: [''],
      enabled: [false],
    });
  }

}
