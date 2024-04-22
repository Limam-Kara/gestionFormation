import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './Authentication/login/login.component';
import { ForgetPassComponent } from './Authentication/forget-pass/forget-pass.component';
import { ResetPassComponent } from './Authentication/reset-pass/reset-pass.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/Authentication/Login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {path:'Authentication/Login',component:LoginComponent},
  {path:'Authentication/ForgetPassword',component:ForgetPassComponent},
  {path:'Authentication/ResetPassword',component:ResetPassComponent},

];
