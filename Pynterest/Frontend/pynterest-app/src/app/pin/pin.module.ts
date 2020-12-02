import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PinRoutingModule } from './pin-routing.module';
import { PinDetailsComponent } from './pin-details/pin-details.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [PinDetailsComponent],
  imports: [
    CommonModule,
    PinRoutingModule,
    SharedModule,
    MatCardModule,
    MatIconModule
  ]
})
export class PinModule { }
