import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {faPaperPlane, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';

import {SurveysService} from '../services/surveys.service';
import {AlertService} from '../services/alert.service';

import {
    AnswerItemForSend,
    ResponseMessage,
    ServerResponseError,
    SurveyQuestionsForPass
} from '../interfaces/interfaces-list';

@Component({
    selector: 'app-user-survey-pass',
    templateUrl: './user-survey-pass.component.html',
    styleUrls: ['./user-survey-pass.component.scss']
})
export class UserSurveyPassComponent implements OnInit, AfterViewInit {

    public questionArray: Array<SurveyQuestionsForPass>;
    public sendIcon = faPaperPlane;
    public goBackIcon = faArrowLeft;
    public statusSurvey = true;

    private querySubscription: Subscription;
    private sendData: Array<AnswerItemForSend> = [];
    private tokenSurvey: string;
    private idSurvey: number;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private location: Location,
        private surveysService: SurveysService,
        private alertService: AlertService) {
        this.querySubscription = activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.tokenSurvey = queryParam['token'];
                this.idSurvey = queryParam['id'];
            }
        );
    }

    ngOnInit() {
        if (this.tokenSurvey && this.idSurvey && !localStorage.getItem(this.tokenSurvey)) {
            this.surveysService.getSurveyQuestionsForPass(this.tokenSurvey)
                .subscribe(
                    (data: Array<SurveyQuestionsForPass>) => {
                        this.questionArray = data;
                    },
                    (error: ServerResponseError) => {
                        this.alertService.alertSetSubject('This survey does not exist or survey is completed', 'warning');
                        this.statusSurvey = false;
                    }
                );
        } else {
            this.alertService.alertSetSubject('This survey does not exist or survey is completed', 'warning');
            this.statusSurvey = false;
        }
    }

    ngAfterViewInit(): void {
    }

    getInputField(querySearch: string, typeInput: number) {
        this.elementRef.nativeElement.querySelectorAll(querySearch).forEach((elem) => {
            switch (typeInput) {
                case 1: {
                    if (elem.checked) {
                        this.createDataItemForSend(parseInt(elem.value, 10), null);
                    }
                    break;
                }
                case 2: {
                    if (elem.value) {
                        this.createDataItemForSend(parseInt(elem.id, 10), elem.value);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }

    createDataItemForSend(answerId: number, fullAnswer: string) {
        const temp: AnswerItemForSend = {
            surv_id: <number>this.idSurvey,
            answer_id: answerId,
            full_answer: fullAnswer
        };
        this.sendData.push(temp);
    }

    goBackHistory() {
        this.location.back();
    }

    sendAnswers() {
        this.getInputField('input.answer-checkbox', 1);
        this.getInputField('textarea.answer-textarea', 2);
        this.surveysService.postSendAnswerSurvey(this.sendData)
            .subscribe(
                (data: ResponseMessage) => {
                    localStorage.setItem(this.tokenSurvey, 'Completed');
                    this.sendData.length = 0;
                    this.statusSurvey = false;
                },
                (error: ServerResponseError) => {
                    this.alertService.alertSetSubject(error.error.message, 'warning');
                }
            );
    }
}
