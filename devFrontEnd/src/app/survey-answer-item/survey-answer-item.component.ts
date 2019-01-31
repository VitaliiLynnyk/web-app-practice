import { Component, OnInit, Input } from '@angular/core';

import { faPlusSquare, faMinusSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-survey-answer-item',
  templateUrl: './survey-answer-item.component.html',
  styleUrls: ['./survey-answer-item.component.scss']
})
export class SurveyAnswerItemComponent implements OnInit {

  @Input() isRight: boolean;
  @Input() answerText: string;

  className: string;
  iconName: any;

  constructor() { }

  ngOnInit() {
    this.checkTypeAnswer();
  }

  checkTypeAnswer() {
    if (this.isRight === true) {
      this.changeIconSettings('text-success', faPlusSquare);
    } else if (this.isRight === false) {
      this.changeIconSettings('text-danger', faMinusSquare);
    } else {
      this.changeIconSettings('text-primary', faCheckSquare);
    }
  }

  changeIconSettings(cName: string, iName: any) {
    this.className = cName;
    this.iconName = iName;
  }
}
