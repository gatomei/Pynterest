import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard'

const routes: Routes = [
  { path: 'login', 
    loadChildren: () => import('./login/login.module')
      .then(m => m.LoginModule) 
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
      canActivate:[AuthGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
  { path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module')
    .then(m => m.ResetPasswordModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
