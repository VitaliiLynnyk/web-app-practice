import { Component, OnInit } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
    {
      type: 'danger',
      message: 'This user does not exist.'
    },
    {
      type: 'danger',
      message: 'Wrong password.'
    }
  ];

@Component({
  selector: 'app-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent implements OnInit {

  constructor() { }

  // alerts: Alert[];

  alerts = Array.from(ALERTS);

  ngOnInit() {
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }


}
