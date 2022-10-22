import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityFilter } from '../activity/activity-filter.model';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '../models/Activity';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  opened: boolean;
  activities: Activity[];
  upComingActivitiesSub: Subscription;
  upComingActivities: Activity[] = [];

  allFutureActivitiesSub: Subscription;
  allFutureActivities: Activity[] = [];

  constructor(
    private activitiesService: ActivityService,
    private router: Router,
  ) {
    this.activities = this.activitiesService.activitiesData;
  }

  ngOnInit(): void {
    console.log('hello');
    this.upComingActivitiesSub = this.activitiesService
      .getUpcomingActivities()
      .subscribe((data) => {
        this.upComingActivities = data;
      });

    this.allFutureActivitiesSub = this.activitiesService
      .getFutureActivities()
      .subscribe((data) => {
        this.allFutureActivities = data;
      })
  }

  ngAfterContentInit(): void {
    this.activitiesService.fetchUpcomingActivities();
    this.activitiesService.fetchFutureActivities();
  }

  handleFilter(filter: ActivityFilter) {
    this.router.navigate([
      'filtered-activity',
      { payload: JSON.stringify(filter) },
    ]);
  }

  ngOnDestroy() {
    this.upComingActivitiesSub.unsubscribe();
  }
}
