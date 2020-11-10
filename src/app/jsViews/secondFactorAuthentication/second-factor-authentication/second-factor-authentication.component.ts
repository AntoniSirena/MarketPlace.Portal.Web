import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ilogin } from '../../../interfaces/Ilogin/ilogin';
import { RedirectService } from '../../../services/redirect/redirect.service';

@Component({
  selector: 'app-second-factor-authentication',
  templateUrl: './second-factor-authentication.component.html',
  styleUrls: ['./second-factor-authentication.component.css']
})
export class SecondFactorAuthenticationComponent implements OnInit {


  constructor(
    private redirectService: RedirectService,
    private form: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  validate2FAForm: FormGroup;

  token: string;

  ngOnInit(): void {
    this.setValueValidate2FAForm();
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    console.log(this.token)
  }


  submit(form: any) {
    const request: Ilogin = {
      UserName: '',
      Password: '',
      EmailAddress: '',
      SecurityCode: form.securityCode,
      Token2AF: this.token,
    };

    this.redirectService.SubmitLogin(request);
  }

  setValueValidate2FAForm() {
    this.validate2FAForm = this.form.group({
      securityCode: ['', Validators.required],
    });
  }

}
