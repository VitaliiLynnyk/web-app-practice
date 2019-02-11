import {Component, OnInit} from '@angular/core';

import {AlertService} from '../services/alert.service';

import {AlertObject} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-alert-closeable',
    templateUrl: './alert-closeable.component.html',
    styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent implements OnInit {

    public alertMessage: string;
    public typeMessage: string;
    public showingAlert = false;

    private timerContainer: any;
    private timeMessage = 5000;

    constructor(private alertService: AlertService) {
        this.alertService.alertSubscription$.subscribe((temp: AlertObject) => {
            if (!temp.messageAlert && !temp.typeAlert) {
                this.closeAlert();
            } else {
                this.closeAlert();
                this.alertMessage = temp.messageAlert;
                this.typeMessage = temp.typeAlert;
                if (temp.timeAlert) {
                    this.timeMessage = temp.timeAlert;
                }
                setTimeout(() => this.showAlert(), 300);
            }
        });
    }

    ngOnInit() {
    }

    showAlert() {
        this.showingAlert = true;
        this.timerContainer = setTimeout(() => this.closeAlert(), this.timeMessage);
    }

    closeAlert() {
        this.showingAlert = false;
        clearTimeout(this.timerContainer);
    }
}
