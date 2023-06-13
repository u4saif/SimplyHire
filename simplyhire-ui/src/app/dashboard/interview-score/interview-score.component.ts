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
  value = 3;
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
      this.tabs.data = this.tabs.data.map(
        (item) =>
          (item = {
            ...item,
            containt:
              item.tabName == 'Details'
                ? this.fullviewInterview.basicDeails
                : item.tabName == 'Job Discriton'
                ? this.fullviewInterview.jobDiscription
                : item.tabName == 'Assessment Scores'
                ? this.createAssessmentModel(this.fullviewInterview)
                : {},
          })
      );

      console.log(this.tabs);
    });
  }

  createAssessmentModel(interviewForm: any) {
    return {
      skills: interviewForm.basicDeails.skills.map((item: any) => {
        return {
          skillName: item,
          comment: '',
          score: '',
        };
      }),
      overAllScore: ''
    };
  }
}
