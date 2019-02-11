import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSurveyPassComponent } from './user-survey-pass.component';

describe('UserSurveyPassComponent', () => {
  let component: UserSurveyPassComponent;
  let fixture: ComponentFixture<UserSurveyPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSurveyPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSurveyPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
