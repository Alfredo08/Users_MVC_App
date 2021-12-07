import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NewUserFormComponent } from '../new-user-form/new-user-form.component';
import { UserParamComponent } from '../user-param/user-param.component';

let routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'addUser',
    component: NewUserFormComponent
  },
  {
    path: 'user/:username',
    component: UserParamComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
