import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NgZorroComponentProviderModule } from '../ng-zorro-component-provider.module';
import { IconsProviderModule } from '../icons-provider.module';
import { InterviewformComponent } from './interviewform/interviewform.component';
import { ContainerComponent } from './container/container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterviewScoreComponent } from './interview-score/interview-score.component';


@NgModule({
  declarations: [
    HomeComponent,
    InterviewformComponent,
    ContainerComponent,
    InterviewScoreComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    IconsProviderModule,
    NgZorroComponentProviderModule
  ]
})
export class DashboardModule { }
