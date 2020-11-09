import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { PinComponent } from './components/pin/pin.component';
import { PanelComponent } from './components/panel/panel.component';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [HeaderComponent, PinComponent, PanelComponent],
  imports: [    
    CommonModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
