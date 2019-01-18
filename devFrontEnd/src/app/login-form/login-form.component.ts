import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {faUserCircle, faUnlock, faSignInAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  constructor(private router: Router) {
  }

  loginForm: FormGroup = new FormGroup({
    loginEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/),
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

  ngOnInit() {
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
    this.router.navigate(['home']);
  }


}
