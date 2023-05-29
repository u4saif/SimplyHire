import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { IconsProviderModule } from '../icons-provider.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroComponentProviderModule } from '../ng-zorro-component-provider.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NgZorroComponentProviderModule
  ]
})
export class AuthModule { }
