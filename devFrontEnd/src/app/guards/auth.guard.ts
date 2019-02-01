import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';

import {ResponseMessage, ServerResponseError} from '../interfaces/interfaces-list';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return !!this.isAuthUser();
    }

    isAuthUser() {
        let isAuth: any;
        if (localStorage.getItem('tokenSession')) {
            isAuth = this.authService.postAuthentication()
                .subscribe(
                    (data: ResponseMessage) => {
                        return true;
                    },
                    (error: ServerResponseError) => {
                        if (!error.error.message) {
                            this.router.navigate(['']);
                            this.alertService.alertSetSubject(
                                'You are not authorized',
                                'danger',
                                error.error.status);
                        } else {
                            this.alertService.alertSetSubject(
                                error.error.message,
                                'danger',
                                error.status);
                        }
                        return false;
                    }
                );
        } else {
            this.router.navigate(['']);
            this.alertService.alertSetSubject(
                'You are not authorized',
                'danger',
                401);
            return false;
        }
        return isAuth;
    }
}
