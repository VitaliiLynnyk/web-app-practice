import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faUserCircle, faUnlock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../services/login.service';
import { AlertService} from '../services/alert.service';
import { ServerResponse } from '../class-list';

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
      Validators.maxLength(50),
      Validators.minLength(6)
    ]),
    loginPassword: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(5)
    ]),
  });

  emailIcon = faUserCircle;
  passwordIcon = faUnlock;
  buttonIcon = faSignInAlt;

  errorMessageEmail = 'Please provide a email.';
  errorMessagePassword = 'Please provide a password.';

  done = false;

  constructor(private loginService: LoginService, private router: Router, private alertService: AlertService) {
  }

  ngOnInit() {
    // TODO: logout
  }

  validateEmailField(e) {
    if (e === '') {
      this.errorMessageEmail = 'Please provide a email.';
    } else {
      this.errorMessageEmail = 'Please provide a valid email.';
    }
  }

  validatePasswordField(e) {
    if (e === '') {
      this.errorMessagePassword = 'Please provide a password.';
    } else {
      this.errorMessagePassword = 'Must be 5-100 characters long.';
    }
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.loginService.postLoginData(this.loginForm.value)
      .subscribe(
        (data: ServerResponse) => {
          console.log(data);
          this.done = true;
          // this.router.navigate(['home']);
        },
        (error: ServerResponse) => {
          console.log(error);
          console.log(error.error);
          console.log(error.error.message);
          this.alertService.alertSetText(error.error.message);
        }
      );
  }


}
