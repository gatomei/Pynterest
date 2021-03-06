import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard'

const routes: Routes = [
  { path: 'login',
    loadChildren: () => import('./login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
      canActivate:[AuthGuard]
  },
  { path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module')
    .then(m => m.ResetPasswordModule)
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  {path:'pin', loadChildren: () =>
   import('./pin/pin.module').then(m => m.PinModule),
   canActivate:[AuthGuard]
  },
  {path:':username/boards',
   loadChildren:()=>import('./board/board.module').then(m => m.BoardModule),
  canActivate:[AuthGuard]
},
  { path: '**', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
