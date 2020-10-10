import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home-page', 
    loadChildren: () => import('./home-page/home-page.module')
      .then(m => m.HomePageModule) 
  },
  { path: '**', pathMatch: 'full', redirectTo: '/home-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
