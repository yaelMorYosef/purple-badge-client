import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineSingleComponent } from './time-line-single.component';

describe('TimeLineSingleComponent', () => {
  let component: TimeLineSingleComponent;
  let fixture: ComponentFixture<TimeLineSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLineSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
