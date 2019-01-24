import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { ResponseMessage, ServerResponseError } from '../interfaces/interfaces-list';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnChanges, OnInit {

  result: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) {
  }

  ngOnChanges() {
  }

  ngOnInit() {

    debugger;

/*
    if (localStorage.getItem('tokenSession')) {
      this.authService.postAuthentication()
        .subscribe(
          (data: ResponseMessage) => {
            console.log('200 SERVER', data);
            this.result = data.message;
          },
          (error: ServerResponseError) => {
            console.log('ERROR SERVER', error);
            if (error.error.message === 'false') {
              this.router.navigate(['']);
              this.alertService.alertSetSubject('You are not authorized', 'danger', error.error.status);
            } else {
              this.alertService.alertSetSubject(error.error.message, 'danger', error.status);
            }
          }
        );
    } else {
      this.router.navigate(['']);
      this.alertService.alertSetSubject('You are not authorized', 'danger', 401);
    }
*/
  }



}


