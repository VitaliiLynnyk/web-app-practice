import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {SurveysService} from '../services/surveys.service';
import {AlertService} from '../services/alert.service';

import {ServerResponseError, SurveyInfo} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-completed-survey-info',
    templateUrl: './completed-survey-info.component.html',
    styleUrls: ['./completed-survey-info.component.scss']
})
export class CompletedSurveyInfoComponent implements OnInit {

    idSurvey: number;
    querySubscription: Subscription;
    surveyData: Array<SurveyInfo>;

    goBackIcon = faArrowLeft;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private surveyService: SurveysService) {
        this.querySubscription = activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                    this.idSurvey = queryParam['id'];
                    console.log(queryParam);
                }
            );
    }

    ngOnInit() {
        if (this.idSurvey) {
            this.surveyService.getSurveyInfo(this.idSurvey)
                .subscribe(
                    (data: Array<SurveyInfo>) => {
                        this.surveyData = data;
                    },
                    (error: ServerResponseError) => {
                        this.alertService.alertSetSubject(error.error.message, 'warning');
                        this.router.navigate(['home/surveys-list']);
                    }
                );
        } else {
            this.alertService.alertSetSubject('You have not selected a survey.', 'danger');
            this.router.navigate(['home/surveys-list']);
        }
    }
}
