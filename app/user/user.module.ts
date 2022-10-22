import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { ActivityModule } from '../activity/activity.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [UserComponent, ProfileEditComponent],
  imports: [CommonModule, ActivityModule, ReactiveFormsModule, FormsModule,MaterialModule],
  exports: [UserComponent],
})
export class UserModule {}
