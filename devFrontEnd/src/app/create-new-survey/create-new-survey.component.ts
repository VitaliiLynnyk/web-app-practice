import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

import {SurveysService} from '../services/surveys.service';
import {UsersService} from '../services/users.service';
import {AlertService} from '../services/alert.service';

import {ResponseMessage, ServerResponseError, SurveysDegreesItem, UserListItem} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-create-new-survey',
    templateUrl: './create-new-survey.component.html',
    styleUrls: ['./create-new-survey.component.scss']
})
export class CreateNewSurveyComponent implements OnInit {

    createSurveyForm: FormGroup = new FormGroup({
        employeeName: new FormControl('', [
            Validators.required,
            CreateNewSurveyComponent.selectEmployeeValidator
        ]),
        surveyDegree: new FormControl('', [])
    });

    userList: Array<UserListItem>;
    degreesList: Array<SurveysDegreesItem>;

    constructor(
        private surveysService: SurveysService,
        private userService: UsersService,
        private alertService: AlertService) {
    }

    static selectEmployeeValidator(control: FormControl): {[s: string]: boolean} {
        return !control.value.id ? {'employeeName': true} : null;
    }

    ngOnInit() {
        this.userService.getUserList()
            .subscribe(
                (data: Array<UserListItem>) => {
                    this.userList = data;
                },
                (error: ServerResponseError) => {
                    this.alertService.alertSetSubject(error.error.message, 'warning');
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

    searchEmployee = (text$: Observable<string>) => {
        return text$.pipe(
            debounceTime(200),
            map(term => {
                return term === '' ? []
                    : this.userList.filter(item => {
                        return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
                    }).slice(0, 10);
            })
        );
    }

    formatterResult(item: {name: string}) {
        return item.name;
    }

    onSubmit() {
        const formData = {
            personId: this.createSurveyForm.get('employeeName').value.id,
            degreeId: this.createSurveyForm.get('surveyDegree').value
        };
        this.surveysService.postCreateNewSurvey(formData)
            .subscribe(
                (data: ResponseMessage) => {
                    this.alertService.alertSetSubject(data.message, 'success');
                },
                (error: ServerResponseError) => {
                    this.alertService.alertSetSubject(error.error.message, 'warning');
                }
            );
    }
}
