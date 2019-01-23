import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent implements OnInit {

  alertMessage: string;
  nextMessage = 'This is test message';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

/*
  testShowSet() {
    console.log('error component - ' + this.alertService.alertGetText());
  }
*/


  showAlert() {
    this.alertMessage = this.alertService.alertGetText();
    console.log('alertMessage - ' + this.alertMessage);
    // this.alertMessage = this.nextMessage;
    setTimeout(() => this.alertMessage = null, 5000);
  }

  close() {
    this.alertMessage = null;
  }

  show() {
    this.showAlert();
    // this.testShowSet();
  }



}
