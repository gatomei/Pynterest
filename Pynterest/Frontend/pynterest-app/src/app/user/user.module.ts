import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '@app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { UserInterestsComponent } from './user-interests/user-interests.component';


@NgModule({
  declarations: [UserProfileComponent, UserInterestsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
  ]
})
export class UserModule { }
