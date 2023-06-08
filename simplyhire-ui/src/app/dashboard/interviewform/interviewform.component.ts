import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, map } from 'rxjs';
import { InterviewService } from 'src/app/services/dashboard/interview.service';
import { Constants } from 'src/app/models/constants';
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
      resume: [null, Validators.required],
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

  ngOnInit() {}
  submitForm(): void {
    this.interviewService
      .submitForm(this.dynamicForm.value, 'dashboard/addnew')
      .subscribe({
        next: () => {
          this.dynamicForm.reset();
        },
        error: (error) => {
          this.message.create(
            'error',
            `Unable to Save. ${error?.error?.error || error?.error?.message}`
          );
        },
      });
  }

  async handleChange(value: any) {
    const { name, size, type } = value.file;
    const file = value.file.originFileObj;
    const convertedData = (await this.convertToBase64(file)) as string;

    if (value.type == 'start') {
      this.interviewService
        .uplodFile('resume/new-upload', {
          fileData: convertedData,
          name,
          size,
          type,
        })
        .subscribe((resp: any) => {
          const fileId = resp.resume[0]['_id'];
          console.log(this.dynamicForm);
          this.dynamicForm.controls['basicDeails'].controls['resume'].setValue(
            fileId
          );
          this.message.create('success', 'File uploaded successfully!');
        });
    }

    if (value.type == 'removed') {
      this.dynamicForm.controls['basicDeails'].controls['resume'].setValue(
        null
      );
    }
  }

  convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
}
