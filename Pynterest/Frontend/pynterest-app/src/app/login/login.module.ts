import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio"
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialFileInputModule } from 'ngx-material-file-input';



import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule, FormsModule,
    ReactiveFormsModule, MatRadioModule, MatCardModule,
    MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule,
    MaterialFileInputModule
  ]
})
export class LoginModule { }
