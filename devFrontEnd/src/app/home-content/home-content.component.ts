import {Component, OnInit} from '@angular/core';

import {SurveysService} from '../services/surveys.service';
import {AlertService} from '../services/alert.service';

import {ServerResponseError, SurveyStatisticItem} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-home-content',
    templateUrl: './home-content.component.html',
    styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

    public surveyStatisticData: Array<SurveyStatisticItem>;

    constructor(
        private surveyService: SurveysService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.surveyService.getSurveyStatistic()
            .subscribe(
                (data: Array<SurveyStatisticItem>) => {
                    this.surveyStatisticData = data;
                },
                (error: ServerResponseError) => {
                    this.alertService.alertSetSubject(error.error.message, 'warning');
                }
            );
    }
}
