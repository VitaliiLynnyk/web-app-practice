import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStatisticItemComponent } from './home-statistic-item.component';

describe('HomeStatisticItemComponent', () => {
  let component: HomeStatisticItemComponent;
  let fixture: ComponentFixture<HomeStatisticItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStatisticItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStatisticItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
