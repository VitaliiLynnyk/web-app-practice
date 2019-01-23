import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faUserCircle, faUnlock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
import { LogoutService } from '../services/logout.service';

import { ServerResponseError, ResponseMessage, ServerResponseOk } from '../interfaces/interfaces-list';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    loginEmail: new FormControl('', [
      Validators.required,
      Validators.email,
      // Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/),
    ]),
    loginPassword: new FormControl('', [
      Validators.required,
    ]),
  });

  emailIcon = faUserCircle;
  passwordIcon = faUnlock;
  buttonIcon = faSignInAlt;

  errorMessageEmail = 'Please provide a email.';
  errorMessagePassword = 'Please provide a password.';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private logoutService: LogoutService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    if (localStorage.getItem('tokenSession')) {
      this.logoutService.postLogoutSignal()
        .subscribe(
          (data: ResponseMessage) => {
            localStorage.removeItem('tokenSession');
            console.log('200 SERVER', data);
            this.alertService.alertSetSubject(data.message, 'warning');
            // this.router.navigate(['home']);
          },
          (error: ServerResponseError) => {
            console.log('ERROR SERVER', error);
            this.alertService.alertSetSubject(error.error.message, 'danger');
          }
        );
    }
  }

  validateEmailField(e) {
    e === '' ?
      this.errorMessageEmail = 'Please provide a email.'
      : this.errorMessageEmail = 'Please provide a valid email.';
  }

  validatePasswordField(e) {
    if (e === '') { this.errorMessagePassword = 'Please provide a password.'; }
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.loginService.postLoginData(this.loginForm.value)
      .subscribe(
        (data: ServerResponseOk) => {
          console.log('200 SERVER', data);
          localStorage.setItem('tokenSession', data.token);
          console.log(localStorage.getItem('tokenSession'));
          // this.router.navigate(['home']);
        },
        (error: ServerResponseError) => {
          console.log('ERROR SERVER', error);
          this.alertService.alertSetSubject(error.error.message, 'danger');
        }
      );
  }


}
