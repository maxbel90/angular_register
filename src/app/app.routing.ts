import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

import {AuthProvider} from "./_services/auth.provider";
import {RegisterComponent} from "./register/register.component";

import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ShowAllComponent} from "./show-all/show-all.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

const appRoutes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthProvider] },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthProvider] },
  { path: 'show-all', component: ShowAllComponent, canActivate: [AuthProvider] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthProvider] },
  { path: '**', redirectTo: '' }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
