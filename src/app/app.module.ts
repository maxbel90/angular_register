import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {AuthProvider} from "./_services/auth.provider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "./_services/authentication.service";
import {HttpModule} from "@angular/http";
import {RegisterComponent} from "./register/register.component";
import {MenuComponent} from "./menu/menu.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {UserService} from "./_services/user.service";
import {ShowAllComponent} from "./show-all/show-all.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {AlertService} from "./_services/alert.service";
import {AlertComponent} from "./_directives/alert/alert.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    ChangePasswordComponent,
    ShowAllComponent,
    EditUserComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthProvider,
    AuthenticationService,
    UserService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
