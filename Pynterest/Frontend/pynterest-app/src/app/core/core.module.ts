import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notification.service';
import { SessionStorageService } from './services/session-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  providers: [ NotificationService, NotificationService, SessionStorageService ],
  declarations: [],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
      onActivateTick: true,
      enableHtml: true,
      timeOut: 2000
    }),
    HttpClientModule,
    RouterModule,
    CommonModule
  ]
})
export class CoreModule { }
