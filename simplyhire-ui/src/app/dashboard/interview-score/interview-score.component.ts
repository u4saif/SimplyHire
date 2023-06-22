import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/services/dashboard/interview.service';
import { interviewBasicDetails } from 'src/app/models/interviewScores.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Constants } from 'src/app/models/constants';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-interview-score',
  templateUrl: './interview-score.component.html',
  styleUrls: ['./interview-score.component.less'],
})
export class InterviewScoreComponent implements OnInit {
  tabs = new interviewBasicDetails();
  base64Sample = Constants.pdfSample;
  resumeID: any = '';
  resumeBase64Data: any = '';
  paramsObject: any;
  interviewId: String | undefined;
  fullviewInterview: any = [];
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  tooltipEmoji = ['🥵', '🥵', '🥺', '😊', '😎'];
  isLoading: boolean = true;
  scoreCardForm!: FormGroup;
  resume: any;
  constructor(
    private InterviewService: InterviewService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    /**
     * @ Capturring the Interview ID from Route Params
     */
    this.route.paramMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.interviewId = this.paramsObject.params[this.paramsObject[0]];
    });

    /**
     * @ Calling Backend and Creating the Tabs
     */
    this.InterviewService.get(
      `dashboard/fullView/${this.interviewId}`
    ).subscribe((response: any) => {
      this.fullviewInterview = response.singleInterview[0];
      this.tabs.data = this.tabs.data.map(
        (item) =>
          (item = {
            ...item,
            containt:
              item.tabName == 'Details'
                ? this.fullviewInterview.basicDeails
                : item.tabName == 'Job Discriton'
                ? this.fullviewInterview.jobDiscription
                : {},
          })
      );

      /**
       * @ Initilize the formGroup for FeedBack Form
       */
      this.scoreCardForm = this.fb.group({ scoreDetails: this.fb.array([]) });
      const scoreCard = this.fullviewInterview.scoreCard;

      scoreCard.forEach((item: any) => {
        const groupNames = this.fb.group({
          comment: new FormControl(item.comment, Validators.required),
          score: new FormControl(item.score, Validators.required),
          skillName: new FormControl(item.skillName, Validators.required),
        });
        this.scoreDetails.push(groupNames);
      });
      //this.scoreCardForm.disable();
      this.isLoading = false;
      this.resumeID = this.fullviewInterview.basicDeails.resume;
      this.getResumeData(this.resumeID);
    });
  }
  get scoreDetails() {
    return this.scoreCardForm.controls['scoreDetails'] as FormArray;
  }

  /**
   * Getting the Resume Data
   */
  getResumeData(resumeID: any) {
    this.InterviewService.get(`resume/uploaded/${resumeID}`).subscribe({
      next: (value: any) => {
        this.resume = value.resume[0];
        this.resumeBase64Data = value.resume[0];
        this.resumeBase64Data = 'data:' + this.resumeBase64Data.fileData.contentType + ';base64,' + btoa(String.fromCharCode(...new Uint8Array(this.resumeBase64Data.fileData.data.data)))
      },
    });
  }

  /**
   * Calculate OverAll Score
   */
  reCalculatedScore(skill: string) {
    if (skill == 'Over ALL Score') return;
    const totalScore = this.scoreCardForm.value.scoreDetails
      .filter((score: any) => score.skillName != 'Over ALL Score')
      .map((item: any) => item.score);
    const totalAverage = Math.floor(
      totalScore.reduce((item: any, count: any) => item + count, 0) /
        totalScore.length
    );
    this.scoreDetails.controls.forEach((element: any) => {
      if (element.controls['skillName'].value == 'Over ALL Score') {
        element.controls['score'].setValue(totalAverage);
      }
    });
  }

  /**
   * Submit the feedback Form
   */
  submitScores() {
    const formData = { scoreCard: this.scoreDetails.value };
    this.InterviewService.updateFormData(
      `dashboard/fullView/${this.interviewId}`,
      formData
    ).subscribe({
      next: () => {
        this.message.create('success', 'Data Saved Successfully!');
      },
      error: () => {
        this.message.create('error', 'Some Error Occured :(');
      },
    });
  }

  /**
   * Download Resume
   */

  downloadResume(){
    console.log(this.resume.fileData.data);
    const fileName = this.resume.name.split("_")[1];
    const blob = new Blob([new Uint8Array(this.resume.fileData.data.data)]);
    saveAs(blob,fileName);
  }
}
