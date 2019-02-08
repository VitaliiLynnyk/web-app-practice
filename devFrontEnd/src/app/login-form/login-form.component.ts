import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faSignInAlt, faUnlock, faUserCircle} from '@fortawesome/free-solid-svg-icons';

import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';

import {ResponseMessage, ServerResponseError, ServerResponseOk} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    public emailIcon = faUserCircle;
    public passwordIcon = faUnlock;
    public buttonIcon = faSignInAlt;
    public errorMessageEmail = 'Please provide a email.';
    public errorMessagePassword = 'Please provide a password.';

    loginForm: FormGroup = new FormGroup({
        loginEmail: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        loginPassword: new FormControl('', [
            Validators.required
        ]),
    });

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
                    },
                    (error: ServerResponseError) => {
                        error.status === 401 ?
                            localStorage.removeItem('tokenSession')
                            : this.alertService.alertSetSubject(error.error.message, 'danger', error.status);
                    }
                );
        }
    }

    validateField(value: string, type: number) {
        switch (type) {
            case 1: {
                value === '' ?
                    this.errorMessageEmail = 'Please provide a email.'
                    : this.errorMessageEmail = 'Please provide a valid email.';
                break;
            }
            case 2: {
                if (value === '') {
                    this.errorMessagePassword = 'Please provide a password.';
                }
                break;
            }
            default: {
                break;
            }
        }
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
