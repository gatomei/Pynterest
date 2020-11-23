import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { PinComponent } from './components/pin/pin.component';
import { PanelComponent } from './components/panel/panel.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FollowDialogComponent } from './components/follow-dialog/follow-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CreateBoardDialogComponent } from './components/create-board-dialog/create-board-dialog.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    PinComponent,
    PanelComponent,
    ProgressSpinnerComponent,
    FollowDialogComponent,
    CreateBoardDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    PinComponent,
    PanelComponent,
    ProgressSpinnerComponent,
    FollowDialogComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
