import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { ActivityBlockComponent } from './activity-block/activity-block.component';
import { FilterActivityComponent } from './filter-activity/filter-activity.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { IconsModule } from '../icons/icons.module';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ActivityDetailsComponent,
    NewActivityComponent,
    ActivityBlockComponent,
    FilterActivityComponent,
    CarrouselComponent,

  ],
  imports: [
    CommonModule,
    NgbModule,
    IconsModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
    MaterialModule
  ],
  exports: [
    ActivityDetailsComponent,
    NewActivityComponent,
    ActivityBlockComponent,
    FilterActivityComponent,
    CarrouselComponent
  ],
  providers: [CurrencyPipe]
})
export class ActivityModule { }
