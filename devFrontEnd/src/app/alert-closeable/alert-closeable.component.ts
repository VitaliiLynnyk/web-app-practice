import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss'],
  providers: [AlertService]
})
export class AlertCloseableComponent implements OnInit {

  alertMessage: string;
  nextMessage = 'This is test message';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  showAlert() {
    console.log('error component - ' + this.alertService.alertGetText());
    this.alertMessage = this.alertService.alertGetText();
    setTimeout(() => this.alertMessage = null, 5000);
  }

  close() {
    this.alertMessage = null;
  }

  show() {
    this.showAlert();
  }


}
