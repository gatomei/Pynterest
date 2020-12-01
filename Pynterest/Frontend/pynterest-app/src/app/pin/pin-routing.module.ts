import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PinDetailsComponent} from "./pin-details/pin-details.component";
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [{ path: ':id', component: PinDetailsComponent, canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinRoutingModule { }
