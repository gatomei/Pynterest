import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { BoardDetailsComponent } from './board-details/board-details.component';

const routes: Routes = [{ path: ':boardName', component: BoardDetailsComponent, canActivate:[AuthGuard]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
