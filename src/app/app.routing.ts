import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import{ AssociationComponent } from './layouts/association/association.component';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './loginreset/resetpassword/resetpassword.component';
import { AuthGuard } from './variables/auth.guard';
import { ResetComponent } from './loginreset/reset/reset.component';

import { AssAuthGuardService } from './variables/ass-auth-guard.service';

import {CategoryComponent} from "./category/category.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },{
    path: 'change_password',
    component: ResetpasswordComponent
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }],
      canActivate : [AuthGuard]
  },
  {
    path: 'ass',
    component: AssociationComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/association/association.module').then(x => x.AssociationModule)
      }
    ],
    canActivate : [AssAuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  {
    path: 'product',
    redirectTo: 'product',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
