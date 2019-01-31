import { Component, OnInit } from '@angular/core';

import { SurveysService } from '../services/surveys.service';

import { SurveyInfo, ServerResponseError } from '../interfaces/interfaces-list';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.scss']
})
export class SurveysListComponent implements OnInit {

  surveysArray: Array<SurveyInfo>;

  constructor(private surveysService: SurveysService) { }

  ngOnInit() {
    this.surveysService.getSurveysList()
      .subscribe(
        (data: Array<SurveyInfo>) => {
          this.surveysArray = data;
          console.log('ARRAY OF SURVEYS\n', data);
        },
        (error: ServerResponseError) => {
          console.log('ERROR surveysService.getSurveysList()\n', error);
        }
      );

  }

  showInfo(idSurvey: number) {
    console.log(idSurvey);
  }

}
