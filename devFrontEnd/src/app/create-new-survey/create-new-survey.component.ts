import {Component, OnChanges, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {SurveysService} from '../services/surveys.service';
import {UsersService} from '../services/users.service';
import {AlertService} from '../services/alert.service';

import {SurveysDegreesItem, ServerResponseError} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-create-new-survey',
    templateUrl: './create-new-survey.component.html',
    styleUrls: ['./create-new-survey.component.scss']
})
export class CreateNewSurveyComponent implements OnChanges, OnInit {

    createSurveyForm: FormGroup = new FormGroup({
        employeeName: new FormControl('', [
            Validators.required,
        ]),
        surveyDegree: new FormControl('', [])
    });

    degreesList: Array<SurveysDegreesItem>;

    constructor(
        private surveysService: SurveysService,
        private userService: UsersService,
        private alertService: AlertService) {
    }

    ngOnChanges() {
    }

    ngOnInit() {
        this.userService.getUserList()
            .subscribe(
                (data: any) => {
                    console.log(data);
                },
                (error: any) => {
                    console.log(error);
                }
            );
        this.surveysService.getSurveyDegrees()
            .subscribe(
                (data: Array<SurveysDegreesItem>) => {
                    this.degreesList = data;
                    this.createSurveyForm.get('surveyDegree').setValue(data[0].id);
                },
                (error: ServerResponseError) => {
                    this.alertService.alertSetSubject(error.error.message, 'warning');
                }
            );
    }

    onSubmit() {

    }

}
