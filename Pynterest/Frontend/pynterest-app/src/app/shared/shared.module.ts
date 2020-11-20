import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { PinComponent } from './components/pin/pin.component';
import { PanelComponent } from './components/panel/panel.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [HeaderComponent, PinComponent, PanelComponent, ProgressSpinnerComponent],
  imports: [    
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [HeaderComponent, PinComponent, PanelComponent, ProgressSpinnerComponent],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
