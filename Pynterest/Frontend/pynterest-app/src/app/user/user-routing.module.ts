import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { UserInterestsComponent } from './user-interests/user-interests.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: ':username/profile',
    pathMatch: 'full',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'interests',
    pathMatch: 'full',
    component: UserInterestsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
