import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedSurveyInfoComponent } from './completed-survey-info.component';

describe('CompletedSurveyInfoComponent', () => {
  let component: CompletedSurveyInfoComponent;
  let fixture: ComponentFixture<CompletedSurveyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedSurveyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedSurveyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
