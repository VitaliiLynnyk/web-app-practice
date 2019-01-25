import { Component, OnChanges, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnChanges, OnInit {

  result: string;

  constructor(private alertService: AlertService) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
    // this.alertService.alertSetSubject('It is test alert!', 'danger', 401, 100000);
  }



}


