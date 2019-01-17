import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faUserCircle, faUnlock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  loginForm = new FormGroup({
    loginEmail: new FormControl(''),
    loginPassword: new FormControl(''),
  });

  faUserCircleIcon = faUserCircle;
  faUnlockIcon = faUnlock;
  faSignInAltIcon = faSignInAlt;

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.loginForm.value);
  }

  validateFormLogin() {
    
}

}
