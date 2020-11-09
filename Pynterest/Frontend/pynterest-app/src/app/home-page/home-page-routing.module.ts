import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

import { HomePageComponent } from './home-page.component';

const routes: Routes = [{ path: '', component: HomePageComponent, canActivate: [AuthGuard], }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
