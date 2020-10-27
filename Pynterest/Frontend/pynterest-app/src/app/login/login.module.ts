import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio"
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule, FormsModule,
    ReactiveFormsModule, MatRadioModule, MatCardModule,
    MatInputModule, MatButtonModule
  ]
})
export class LoginModule { }
