import {Component, OnInit, Input} from '@angular/core';

import {faPlusSquare, faMinusSquare, faCheckSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-survey-answer-item',
    templateUrl: './survey-answer-item.component.html',
    styleUrls: ['./survey-answer-item.component.scss']
})
export class SurveyAnswerItemComponent implements OnInit {

    @Input() isRight: boolean;
    @Input() answerText: string;

    classNameColorIcon: string;
    classNameColorTooltip: string;
    iconName: any;
    tooltipMessage: string;

    constructor() {
    }

    ngOnInit() {
        this.checkTypeAnswer();
    }

    checkTypeAnswer() {
        if (this.isRight === true) {
            this.changeCorrectnessSettings(
                faPlusSquare,
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
