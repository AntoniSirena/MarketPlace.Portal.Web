import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ilogin } from '../../../interfaces/Ilogin/ilogin';
import { RedirectService } from '../../../services/redirect/redirect.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-second-factor-authentication',
  templateUrl: './second-factor-authentication.component.html',
  styleUrls: ['./second-factor-authentication.component.css']
})
export class SecondFactorAuthenticationComponent implements OnInit {


  @ViewChild('confirminModal') confirminModal: ElementRef;

  constructor(
    private redirectService: RedirectService,
    private form: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private routerService: Router,
  ) { }

  validate2FAForm: FormGroup;

  token: string;

  ngOnInit(): void {
    this.setValueValidate2FAForm();
    this.token = this.activatedRoute.snapshot.paramMap.get('token');

    setTimeout(() => {
      this.modalService.open(this.confirminModal, { size: 'lg', scrollable: true, backdrop: 'static' });
    }, 300);

  }

  goToBack() {
    this.modalService.dismissAll();
    this.routerService.navigate(['login'])
  }

  submit(form: any) {

    const request: Ilogin = {
      UserName: '',
      Password: '',
      EmailAddress: '',
      SecurityCode: form.securityCode,
      Token2AF: this.token,
      RefreshToken: false,
    };

    this.redirectService.SubmitLogin(request);
  }

  setValueValidate2FAForm() {
    this.validate2FAForm = this.form.group({
      securityCode: ['', Validators.required],
    });
  }

}
