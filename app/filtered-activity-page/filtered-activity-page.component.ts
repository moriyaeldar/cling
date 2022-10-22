import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '.././models/Activity';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivityFilter } from '../activity/activity-filter.model';

@Component({
  selector: 'app-filtered-activity-page',
  templateUrl: './filtered-activity-page.component.html',
  styleUrls: ['./filtered-activity-page.component.css'],
})
export class FilteredActivityPageComponent implements OnInit {
  // for nav element
  opened: Boolean;

  // activities
  activitiesByDescription: Activity[] = [];
  activitiesByGeoArea: Activity[] = [];
  activitiesByInterests: Activity[] = [];
  activitiesByDate: Activity[] = [];

  private activitiesByDescriptionSub: Subscription;
  private activitiesByGeoAreaSub: Subscription;
  private activitiesByInterestsSub: Subscription;
  private activitiesByDateSub: Subscription;
  private routeSub: Subscription;
  private toggleActivityFilterMenuSub: Subscription;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //close/open menu
    this.toggleActivityFilterMenuSub = this.activityService
      .getToggleActivityFilterMenu()
      .subscribe((bool) => {
        this.opened = bool;
      });
    // desc sub
    this.activitiesByDescriptionSub = this.activityService
      .getFilteredActivitiesByDescription()
      .subscribe((activities) => {
        this.activitiesByDescription = activities;
      });

    // geo sub
    this.activitiesByGeoAreaSub = this.activityService
      .getFilteredActivitiesByGeoArea()
      .subscribe((activities) => {
        this.activitiesByGeoArea = activities;
      });

    // interest sub
    this.activitiesByInterestsSub = this.activityService
      .getFilteredActivitiesByInterests()
      .subscribe((activities) => {
        this.activitiesByInterests = activities;
      });

    // date sub
    this.activitiesByDateSub = this.activityService
      .getFilteredActivitiesByDate()
      .subscribe((activities) => {
        this.activitiesByDate = activities;
      });
  }

  ngAfterContentInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      const payload = params['payload'];
      if (payload) {
        const parsedPayload = JSON.parse(payload);
        this.activityService.filterActivities(parsedPayload);
      }
    });
  }

  ngOnDestroy(): void {
    this.activitiesByDescriptionSub.unsubscribe();
    this.activitiesByGeoAreaSub.unsubscribe();
    this.activitiesByInterestsSub.unsubscribe();
    this.activitiesByDateSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  handleFilter(filter: ActivityFilter) {
    this.activityService.filterActivities(filter);
  }
}
