import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [HeaderComponent],
  imports: [    
    CommonModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
