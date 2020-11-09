import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard'

const routes: Routes = [
  { path: 'home-page', 
    loadChildren: () => import('./home-page/home-page.module')
      .then(m => m.HomePageModule) ,
    canActivate: [AuthGuard],
  },
  { path: 'login', 
    loadChildren: () => import('./login/login.module')
      .then(m => m.LoginModule) 
  },
  { path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module')
    .then(m => m.ResetPasswordModule) 
  },
  { path: '**', pathMatch: 'full', redirectTo: '/home-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
