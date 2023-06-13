import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/services/dashboard/interview.service';

@Component({
  selector: 'app-interview-score',
  templateUrl: './interview-score.component.html',
  styleUrls: ['./interview-score.component.less'],
})
export class InterviewScoreComponent implements OnInit {
  tabs = [
    {
      tabName: 'Details',
      containt: {
        name: '',
        email: '',
        mobile: '',
        otherNumber: '',
        interviewDate: '',
        qualification: '',
        skills: [],
        resume: '',
      },
    },
    {
      tabName: 'Job Discriton',
      containt: {
        purpouse: '',
        roleResponsiblity: '',
      },
    },
    { tabName: 'Assessment Scores', containt: {
      overAllScore:'',
      
    } },
    { tabName: 'Resume', containt: {} },
  ];
  paramsObject: any;
  interviewId: String | undefined;
  fullviewInterview: any = [];
  constructor(
    private InterviewService: InterviewService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.interviewId = this.paramsObject.params[this.paramsObject[0]];
    });

    this.InterviewService.get(
      `dashboard/fullView/${this.interviewId}`
    ).subscribe((response: any) => {
      this.fullviewInterview = response.singleInterview[0];
      this.tabs = this.tabs.map(
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

      console.log(this.tabs);
    });
  }
}
