import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InterviewformComponent } from './interviewform/interviewform.component';
import { ContainerComponent } from './container/container.component';
import { IsFormDirtyGuard } from '../utils/gaurds/is-form-dirty.guard';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [] },
      { path: 'schedule', component: InterviewformComponent, canDeactivate: [IsFormDirtyGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
