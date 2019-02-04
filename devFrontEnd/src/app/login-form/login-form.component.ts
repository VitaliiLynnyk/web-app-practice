import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {faUserCircle, faUnlock, faSignInAlt} from '@fortawesome/free-solid-svg-icons';

import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';

import {ServerResponseError, ResponseMessage, ServerResponseOk} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup = new FormGroup({
        loginEmail: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        loginPassword: new FormControl('', [
            Validators.required
        ]),
    });

    emailIcon = faUserCircle;
    passwordIcon = faUnlock;
    buttonIcon = faSignInAlt;

    errorMessageEmail = 'Please provide a email.';
    errorMessagePassword = 'Please provide a password.';

    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        if (localStorage.getItem('tokenSession')) {
            this.authService.postLogOut()
                .subscribe(
                    (data: ResponseMessage) => {
                        localStorage.removeItem('tokenSession');
                        localStorage.removeItem('userName');
                        this.alertService.alertSetSubject(data.message, 'warning');
                    },
                    (error: ServerResponseError) => {
                        error.status === 401 ?
                            localStorage.removeItem('tokenSession')
                            : this.alertService.alertSetSubject(error.error.message, 'danger', error.status);
                    }
                );
        }
    }

    validateEmailField(value) {
        value === '' ?
            this.errorMessageEmail = 'Please provide a email.'
            : this.errorMessageEmail = 'Please provide a valid email.';
    }

    validatePasswordField(value) {
        if (value === '') { this.errorMessagePassword = 'Please provide a password.'; }
    }

    onSubmit() {
        this.authService.postLogIn(this.loginForm.value)
            .subscribe(
                (data: ServerResponseOk) => {
                    localStorage.setItem('tokenSession', data.token);
                    localStorage.setItem('userName', data.username);
                    this.loginForm.reset();
                    this.router.navigate(['home']);
                    this.alertService.alertSetSubject(null, null);
                },
                (error: ServerResponseError) => {
                    this.alertService.alertSetSubject(error.error.message, 'danger', error.status);
                    this.loginForm.get('loginPassword').reset();
                }
            );
    }
}
