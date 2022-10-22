import { Component, Input, OnInit } from '@angular/core';
import { ActivityBlockComponent } from '../activity-block/activity-block.component';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';

// red modules
import SwiperCore, { Pagination } from "swiper";
import { Activity } from '../../models/Activity';

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  @Input() activities: Activity[];
  title = "כל הפעילויות";

  constructor() { }

  ngOnInit(): void {
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
