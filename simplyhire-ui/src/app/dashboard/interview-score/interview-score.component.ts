import {
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

@Component({
  selector: 'app-interview-score',
  templateUrl: './interview-score.component.html',
  styleUrls: ['./interview-score.component.less'],
})
export class InterviewScoreComponent implements OnInit {
  tabs = new interviewBasicDetails();
  paramsObject: any;
  interviewId: String | undefined;
  fullviewInterview: any = [];
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  isLoading: boolean = true;
  scoreCardForm!: FormGroup;
  constructor(
    private InterviewService: InterviewService,
    private route: ActivatedRoute,
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
      this.isLoading = false;
    });
  }
  get scoreDetails() {
    return this.scoreCardForm.controls['scoreDetails'] as FormArray;
  }
}
