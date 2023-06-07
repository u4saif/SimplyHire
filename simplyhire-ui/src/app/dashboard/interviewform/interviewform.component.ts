import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, map } from 'rxjs';
import { InterviewService } from 'src/app/services/dashboard/interview.service';
import {Constants}  from 'src/app/models/constants';
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
  listOfSkillsOption = Constants.SkillsOptions;
  listOfPanelistsOption$ = this.interviewService
    .get('dashboard/allPanelists')
    .pipe(map((value: any) => value.panelLists));
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
      purpouse: ['', [Validators.required, Validators.maxLength(500)]],
      roleResponsiblity: [
        '',
        [Validators.required, Validators.maxLength(3000)],
      ],
    }),
    interviewPanel: this.fb.group({
      panelistName: [null, Validators.required],
    }),
  });
  constructor(
    private fb: FormBuilder,
    private interviewService: InterviewService,
    private message: NzMessageService
  ) {}

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
  submitForm(): void {
    this.interviewService
      .submitForm(this.dynamicForm.value, 'dashboard/addnew')
      .subscribe(
        (resp) => {
          this.message.create('success', `Save Successfull`);
          this.dynamicForm.reset();
        },
        (error) => {
          this.message.create(
            'error',
            `Unable to Save. ${error?.error?.error || error?.error?.message}`
          );
        }
      );
  }
  handleChange(value: any) {
    this.dynamicForm.controls['basicDeails'].controls['resume'].setValue(
      'valaa'
    );
  }
}
