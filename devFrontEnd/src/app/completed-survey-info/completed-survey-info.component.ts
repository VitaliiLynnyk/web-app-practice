import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';

import {SurveysService} from '../services/surveys.service';
import {AlertService} from '../services/alert.service';

import {ServerResponseError, SurveyInfo} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-completed-survey-info',
    templateUrl: './completed-survey-info.component.html',
    styleUrls: ['./completed-survey-info.component.scss']
})
export class CompletedSurveyInfoComponent implements OnInit {

    public surveyData: Array<SurveyInfo>;
    public goBackIcon = faArrowLeft;

    private idSurvey: number;
    private querySubscription: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private surveyService: SurveysService) {
        this.querySubscription = activatedRoute.queryParams.subscribe(
            (queryParam: any) => this.idSurvey = queryParam['id']);
    }

    ngOnInit() {
        if (this.idSurvey) {
            this.surveyService.getSurveyInfo(this.idSurvey)
                .subscribe(
                    (data: Array<SurveyInfo>) => {
                        this.surveyData = data;
                    },
                    (error: ServerResponseError) => {
                        error.status === 404 ?
                            this.alertService.alertSetSubject(
                                '№' + this.idSurvey + ' ' + error.error.message,
                                'warning')
                            : this.alertService.alertSetSubject(error.error.message, 'warning');
                        this.router.navigate(['home/surveys-list']);
                    }
                );
        } else {
            this.alertService.alertSetSubject('You have not selected a survey.', 'danger');
            this.router.navigate(['home/surveys-list']);
        }
    }
}
