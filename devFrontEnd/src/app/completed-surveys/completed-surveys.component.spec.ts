import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedSurveysComponent } from './completed-surveys.component';

describe('CompletedSurveysComponent', () => {
  let component: CompletedSurveysComponent;
  let fixture: ComponentFixture<CompletedSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
