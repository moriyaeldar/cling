import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SignoutComponent } from './signout/signout.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    UserEditComponent,
    SignoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
