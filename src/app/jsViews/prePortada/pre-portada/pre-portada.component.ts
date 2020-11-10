import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RedirectService } from '../../../services/redirect/redirect.service';
import { Router } from '@angular/router';
import { Ilogin } from '../../../interfaces/Ilogin/ilogin';

@Component({
  selector: 'app-pre-portada',
  templateUrl: './pre-portada.component.html',
  styleUrls: ['./pre-portada.component.css']
})
export class PrePortadaComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private redirectService: RedirectService,
    private router: Router,
    private form: FormBuilder) {

  }

  ngOnInit(): void {
    this.loginForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.redirectPortada();
  }


  redirectPortada(){
    const login: Ilogin = {
      UserName: 'visitador',
      Password: 'visitador123',
      EmailAddress: null,      
      SecurityCode: '',
      Token2AF: '',
    };

    this.redirectService.SubmitLogin(login, true, true);
  }

}
