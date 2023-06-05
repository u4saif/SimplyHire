import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    NzAvatarModule,
    NzDropDownModule,
    NzCardModule,
    NzTypographyModule,
    NzFormModule,
    NzUploadModule,
    NzInputNumberModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzModalModule
  ],
  exports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    NzAvatarModule,
    NzDropDownModule,
    NzCardModule,
    NzTypographyModule,
    NzFormModule,
    NzUploadModule,
    NzInputNumberModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzModalModule
  ]
})
export class NgZorroComponentProviderModule { }
