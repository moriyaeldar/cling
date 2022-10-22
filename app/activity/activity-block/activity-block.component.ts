import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { ActivityService } from '../activity.service';
import { Activity } from '../../models/Activity';

@Component({
  selector: 'app-activity-block',
  templateUrl: './activity-block.component.html',
  styleUrls: ['./activity-block.component.css'],
})
export class ActivityBlockComponent implements OnInit {
  @Input() activity: Activity;

  constructor(public activityService: ActivityService) {}

  ngOnInit(): void {}

  public config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
  };

}
