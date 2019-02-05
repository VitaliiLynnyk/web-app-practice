import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {SurveysService} from '../services/surveys.service';
import {AlertService} from '../services/alert.service';

import {SurveyDetails, ServerResponseError} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-surveys-list',
    templateUrl: './surveys-list.component.html',
    styleUrls: ['./surveys-list.component.scss']
})
export class SurveysListComponent implements OnInit {

    surveysArray: Array<SurveyDetails>;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private surveysService: SurveysService) {
    }

    ngOnInit() {
        this.surveysService.getSurveysList()
            .subscribe(
                (data: Array<SurveyDetails>) => {
                    this.surveysArray = data;
                },
                (error: ServerResponseError) => {
                    this.alertService.alertSetSubject(error.error.message, 'warning');
                }
            );
    }

    showInfo(idSurvey: number) {
        this.router.navigate(['home/survey-info'], {queryParams: {id: idSurvey}});
    }
}
