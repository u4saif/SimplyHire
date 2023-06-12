import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewScoreComponent } from './interview-score.component';

describe('InterviewScoreComponent', () => {
  let component: InterviewScoreComponent;
  let fixture: ComponentFixture<InterviewScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
