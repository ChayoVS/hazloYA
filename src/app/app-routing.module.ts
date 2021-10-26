import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { IsAuthGuard } from './helpers/is-auth.guard';
import { Role } from './models';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard, IsAuthGuard]
  },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Admin] }
  // },
  {
    path: 'login',
    component: LoginComponent
  },

{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
