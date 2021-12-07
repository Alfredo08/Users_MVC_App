import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';

import { UsersService } from './userlist/users.service';
import { UserComponent } from './user/user.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserParamComponent } from './user-param/user-param.component';

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    UserComponent,
    NewUserFormComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    UserParamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ UsersService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
