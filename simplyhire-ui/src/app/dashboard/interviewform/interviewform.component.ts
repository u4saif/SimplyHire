import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-interviewform',
  templateUrl: './interviewform.component.html',
  styleUrls: ['./interviewform.component.less'],
})
export class InterviewformComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  qualificationOptions: Array<any> = [
    { key: 'btech', value: 'B Tech' },
    { key: 'bcom', value: 'B Comm' },
    { key: 'bca', value: 'BCA' },
  ];
  listOfSkillsOption: Array<any> = [
    { value: 'btech', label: 'B Tech' },
    { value: 'bcom', label: 'B Comm' },
    { value: 'btech2', label: 'B Tech2' },
    { value: 'bcom4', label: 'B Comm4' },
    { value: 'bcom5', label: 'B Comm5' },
    { value: 'bcom6', label: 'B Comm6' },
    { value: 'bcom7', label: 'B Comm7' },
    { value: 'bcom8', label: 'B Comm8' },
  ];
  //interviewForm Initialization;
  dynamicForm = this.fb.group({
    basicDeails: this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      otherNumber: ['', [Validators.maxLength(10)]],
      interviewDate: [null, Validators.required],
      qualification: ['', Validators.required],
      skills: [[], Validators.required],
      resume: ['', Validators.required],
    }),
    jobDiscription: this.fb.group({
      purpouse: ['', [Validators.required, Validators.maxLength(250)]],
      roleResponsiblity: [
        '',
        [Validators.required, Validators.maxLength(1000)],
      ],
    }),
    interviewPanel: this.fb.group({
      panelistName: [null, Validators.required],
    }),
  });
  constructor(private fb: FormBuilder) {}

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        //this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        // this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  ngOnInit() {}
  submitForm(): void {}
  handleChange(value: any) {
    this.dynamicForm.controls['basicDeails'].controls['resume'].setValue(
      'valaa'
    );
  }
}
