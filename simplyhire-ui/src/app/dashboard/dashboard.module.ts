import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NgZorroComponentProviderModule } from '../ng-zorro-component-provider.module';
import { IconsProviderModule } from '../icons-provider.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IconsProviderModule,
    NgZorroComponentProviderModule
  ]
})
export class DashboardModule { }
