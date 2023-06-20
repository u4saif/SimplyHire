import { InterviewService } from 'src/app/services/dashboard/interview.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  data: any;
  constructor(
    private authService: AuthService,
    private InterviewService: InterviewService,
    private storageService: StorageService,
    private route: Router,
    public msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.InterviewService.get('dashboard/interviews').subscribe((resp: any) => {
      this.data = resp.allInterviews;
    });
  }
}
