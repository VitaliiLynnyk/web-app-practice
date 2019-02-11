import {Component, Input, OnInit} from '@angular/core';

import {faCheckSquare, faMinusSquare, faPenSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-survey-answer-item',
    templateUrl: './survey-answer-item.component.html',
    styleUrls: ['./survey-answer-item.component.scss']
})
export class SurveyAnswerItemComponent implements OnInit {

    @Input() public isRight: boolean;
    @Input() public answerText: string;

    public classNameColorIcon: string;
    public classNameColorTooltip: string;
    public tooltipMessage: string;
    public iconName: any;

    constructor() {
    }

    ngOnInit() {
        this.checkTypeAnswer();
    }

    checkTypeAnswer() {
        if (this.isRight === true) {
            this.changeCorrectnessSettings(
                faPenSquare,
                'text-success',
                'hint-success',
                'Correct answer');
        } else if (this.isRight === false) {
            this.changeCorrectnessSettings(
                faMinusSquare,
                'text-danger',
                'hint-danger',
                'Incorrect answer');
        } else {
            this.changeCorrectnessSettings(
                faCheckSquare,
                'text-primary',
                'hint-primary',
                'Detailed answer');
        }
    }

    changeCorrectnessSettings(iName: any, cNameColorIcon: string, cNameColorTooltip: string, tMessage: string) {
        this.iconName = iName;
        this.classNameColorIcon = cNameColorIcon;
        this.classNameColorTooltip = cNameColorTooltip;
        this.tooltipMessage = tMessage;
    }
}
