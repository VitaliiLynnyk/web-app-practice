import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

import {SurveysService} from '../services/surveys.service';
import {UsersService} from '../services/users.service';
import {AlertService} from '../services/alert.service';

import {
    CreateSurveyResponse,
    ServerResponseError,
    SurveysDegreesItem,
    UserListItem
} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-create-new-survey',
    templateUrl: './create-new-survey.component.html',
    styleUrls: ['./create-new-survey.component.scss']
})
export class CreateNewSurveyComponent implements OnInit {

    public degreesList: Array<SurveysDegreesItem>;
    public arrayLinksToCopy: Array<String> = [];
    public tooltipMessage: string;

    private userList: Array<UserListItem>;

    createSurveyForm: FormGroup = new FormGroup({
        employeeName: new FormControl('', [
            Validators.required,
            CreateNewSurveyComponent.selectEmployeeValidator
        ]),
        surveyDegree: new FormControl('', [])
    });

    constructor(
        private surveysService: SurveysService,
        private userService: UsersService,
        private alertService: AlertService) {
    }

    static selectEmployeeValidator(control: FormControl): { [s: string]: boolean } {
        return control.value && control.value.id ? null : {'employeeName': true};
    }

    static createLinkSurvey(token: string, id: number) {
        return 'http://localhost:4200/survey?token=' + token + '&id=' + id;
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
        this.changeTooltipMessage(2);
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

    formatterResult(item: { name: string }) {
        return item.name;
    }

    changeTooltipMessage(type: number) {
        switch (type) {
            case 1: {
                this.tooltipMessage = 'Copied!';
                break;
            }
            case 2: {
                this.tooltipMessage = 'Click to copy to clipboard';
                break;
            }
            default: {
                this.tooltipMessage = 'Click to copy to clipboard';
                break;
            }
        }
    }

    onSubmit() {
        const formData = {
            personId: parseInt(this.createSurveyForm.get('employeeName').value.id, 10),
            degreeId: parseInt(this.createSurveyForm.get('surveyDegree').value, 10)
        };
        this.surveysService.postCreateNewSurvey(formData)
            .subscribe(
                (data: CreateSurveyResponse) => {
                    this.alertService.alertSetSubject('New survey created', 'success');
                    this.createSurveyForm.get('employeeName').reset();
                    this.arrayLinksToCopy.push(CreateNewSurveyComponent.createLinkSurvey(data.random_url, data.survey_id));
                },
                (error: ServerResponseError) => {
                    this.alertService.alertSetSubject(error.error.message, 'warning');
                }
            );
    }
}
