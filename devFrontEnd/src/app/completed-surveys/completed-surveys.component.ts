import { Component, OnInit } from '@angular/core';

import { SurveysService } from "../services/surveys.service";

@Component({
  selector: 'app-completed-surveys',
  templateUrl: './completed-surveys.component.html',
  styleUrls: ['./completed-surveys.component.scss']
})
export class CompletedSurveysComponent implements OnInit {

  constructor(private surveysService: SurveysService) { }

  ngOnInit() {
    this.surveysService.getSurveysList()
      .subscribe(
        (data: object) => {
          console.log(data);
          },
        (error: object) => {
          console.log(error);
        }
        );

  }

}
