import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-interviewform',
  templateUrl: './interviewform.component.html',
  styleUrls: ['./interviewform.component.less']
})
export class InterviewformComponent implements OnInit {
  validateForm: any;

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }
}
