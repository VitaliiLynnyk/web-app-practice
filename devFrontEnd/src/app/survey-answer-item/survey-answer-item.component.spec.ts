import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnswerItemComponent } from './survey-answer-item.component';

describe('SurveyAnswerItemComponent', () => {
  let component: SurveyAnswerItemComponent;
  let fixture: ComponentFixture<SurveyAnswerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAnswerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
