import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';

import { AlertObject } from '../interfaces/interfaces-list';

@Component({
  selector: 'app-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent implements OnInit {

  alertMessage: string;
  typeMessage: string;
  timerContainer: any;
  showingAlert = false;

  constructor(private alertService: AlertService) {
    this.alertService.alertSubscription$.subscribe((temp: AlertObject) => {
        this.closeAlert();
        this.alertMessage = temp.messageAlert;
        this.typeMessage = temp.typeAlert;
        this.showAlert();
      }
    );
  }

  ngOnInit() {
  }

  showAlert() {
    console.log('alertMessage - ' + this.alertMessage);
    this.showingAlert = true;
    this.timerContainer = setTimeout(() => this.closeAlert(), 10000);
  }

  closeAlert() {
    this.showingAlert = false;
    clearTimeout(this.timerContainer);
  }

}
