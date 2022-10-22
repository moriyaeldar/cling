import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { Activity } from '../../models/Activity';
import {Location} from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  activityTitle = "סשן מוזיקה";
  date = "שני, 21/07";
  time = "19:00-21:00";
  price = "46";
  isComing = "מגיע";
  creatorName = "יובל פיטלוק";
  address = "אלנבי 2, תל אביב";
  participants = "16";
  paragraphText = "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח.";
  tagname = "חברים";

  tags = ["חברים","גיטרה","ריקוד","יוגה","כדורסל"];

  activity:Activity

  previousUrl: string = '';
  currentUrl: string = '';
  isAdmin: boolean = true;

  constructor(public activityService: ActivityService, private _location: Location, private router: Router) {
    this.activity = this.activityService.displayedActivityDetails;
    console.log("this.activity",this.activity);

    // router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   console.log('prev:', this.previousUrl);
    //   this.previousUrl = this.currentUrl
    //   this.currentUrl = event.url;
    // });

  }

  ngOnInit(): void {
    console.log('after prev:', this.previousUrl);
  }


  back(){
    console.log(this.previousUrl);
    this._location.back();
  }

  deleteActivity(){
    this.activityService.deleteActivity(this.activity._id)
  }
  editActivity(){
    this.activityService.editDisplayedActivity = true
    this.router.navigateByUrl("/new-activity")
  }

}
