import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewformComponent } from './interviewform.component';

describe('InterviewformComponent', () => {
  let component: InterviewformComponent;
  let fixture: ComponentFixture<InterviewformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
