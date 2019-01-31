import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { SurveysService } from '../services/surveys.service';
import { AlertService } from '../services/alert.service';

import { ServerResponseError, SurveyInfo } from '../interfaces/interfaces-list';

@Component({
  selector: 'app-completed-survey-info',
  templateUrl: './completed-survey-info.component.html',
  styleUrls: ['./completed-survey-info.component.scss']
})
export class CompletedSurveyInfoComponent implements OnInit {

  surveyData: Array<SurveyInfo>;

  goBackIcon = faArrowLeft;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private surveyService: SurveysService) { }

  ngOnInit() {
    if (this.surveyService.getIdSurvey()) {
      this.surveyService.getSurveyInfo()
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
