import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserComponent } from './user/user/user.component';
import { ActivityDetailsComponent } from './activity/activity-details/activity-details.component';
import { NewActivityComponent } from './activity/new-activity/new-activity.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { UserEditComponent } from './auth/user-edit/user-edit.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import { FilteredActivityPageComponent } from './filtered-activity-page/filtered-activity-page.component';
import { ActivityResolver } from './activity/activity.resolver';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: 'profile', canActivate: [AuthGuard] , component: UserComponent },
  { path: 'profile-edit', canActivate: [AuthGuard] ,component: ProfileEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'user-edit', component: UserEditComponent },
  { path: 'activity-details/:id', component: ActivityDetailsComponent , resolve: {activity:ActivityResolver} },
  { path: 'new-activity', canActivate: [AuthGuard] ,component: NewActivityComponent },
  { path: 'filtered-activity', component: FilteredActivityPageComponent },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
