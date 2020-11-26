import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { PinComponent } from './components/pin/pin.component';
import { PanelComponent } from './components/panel/panel.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FollowDialogComponent } from './components/follow-dialog/follow-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPinDialogComponent } from './components/add-pin-dialog/add-pin-dialog.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateBoardDialogComponent } from './components/create-board-dialog/create-board-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PinComponent,
    PanelComponent,
    ProgressSpinnerComponent,
    FollowDialogComponent,
    AddPinDialogComponent,
    CreateBoardDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialFileInputModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatCardModule,
    MatSlideToggleModule,
  ],
  exports: [
    HeaderComponent,
    PinComponent,
    PanelComponent,
    ProgressSpinnerComponent,
    FollowDialogComponent,
    AddPinDialogComponent
  ],
  providers: [
    FormBuilder,
    NgxImageCompressService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
