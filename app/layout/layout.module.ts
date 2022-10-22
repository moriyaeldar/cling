import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { ActivityModule } from '../activity/activity.module';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '../icons/icons.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { FilteredActivityPageComponent } from '../filtered-activity-page/filtered-activity-page.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    HomePageComponent,
    FilteredActivityPageComponent,
  ],
  imports: [
    CommonModule,
    ActivityModule,
    AppRoutingModule,
    NgbModule,
    IconsModule,
    MatSidenavModule,
    MatInputModule,
  ],
  exports: [NavbarComponent, LayoutComponent],
})
export class LayoutModule {}
