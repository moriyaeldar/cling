import { Injectable } from '@angular/core';
import ActivitiesData from '../../assets/ActivitiesData.json';
import { Observable, Subject, throwError } from 'rxjs';
import { ActivityFilter } from './activity-filter.model';
import { Router } from '@angular/router';
import Weekdays from '../../assets/Weekdays.json';
import { Activity } from '../models/Activity';
import { HttpClient } from '@angular/common/http';
import { HttpHeaderResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  [x: string]: any;
  activitiesData: any = ActivitiesData;
  editDisplayedActivity: boolean = false;
  displayedActivityDetails: Activity;
  apiUrl = environment.apiUrl;
  private filteredActivitiesByDescription = new Subject<Activity[]>();
  private filteredActivitiesByGeoArea = new Subject<Activity[]>();
  private filteredActivitiesByInterests = new Subject<Activity[]>();
  private filteredActivitiesByDate = new Subject<Activity[]>();
  private upcomingActivities = new Subject<Activity[]>();
  private futureActivities = new Subject<Activity[]>();
  private toggleActivityFilterMenu = new Subject<Boolean>();
  private formatErrors(error: any) {
    return  throwError(error.error);
  }
  constructor(private router: Router, private http: HttpClient) {}

  getFilteredActivitiesByDescription() {
    return this.filteredActivitiesByDescription.asObservable();
  }
  getFilteredActivitiesByGeoArea() {
    return this.filteredActivitiesByGeoArea.asObservable();
  }
  getFilteredActivitiesByInterests() {
    return this.filteredActivitiesByInterests.asObservable();
  }
  getFilteredActivitiesByDate() {
    return this.filteredActivitiesByDate.asObservable();
  }
  getToggleActivityFilterMenu() {
    return this.toggleActivityFilterMenu.asObservable();
  }
  getUpcomingActivities() {
    return this.upcomingActivities.asObservable();
  }
  getFutureActivities() {
    return this.futureActivities.asObservable();
  }

  toggleMenu(bool = false) {
    this.toggleActivityFilterMenu.next(bool);
  }

  async fetchUpcomingActivities() {
    const now = new Date().getTime();
    const aWeekFromNow = now + 1000 * 60 * 60 * 24 * 7; // 7 days

    try {
      this.http.get<Activity[]>(`${this.apiUrl}`).subscribe((activities) => {
        const upComingActivities = activities.filter((activity) => {
          const activityDate = new Date(activity.date).getTime();
          return activityDate > now && activityDate < aWeekFromNow;
        });
        console.log('upComing activities: ', upComingActivities);
        this.upcomingActivities.next(upComingActivities);
      });
    } catch (err) {
      console.warn(
        '🚀 ~ file: activity.service.ts ~ line 83 ~ ActivityService ~ fetchUpcomingActivities ~ error',
        err
      );
    }
  }
  async fetchFutureActivities() {
    const now = new Date().getTime();
    try {
      this.http.get<Activity[]>(`${this.apiUrl}`).subscribe((activities) => {
        const futureActivities = activities.filter(
          (activity) => new Date(activity.date).getTime() > now
        );
        console.log('future activities: ', futureActivities);
        this.futureActivities.next(futureActivities);
      });
    } catch (err) {
      console.warn(
        '🚀 ~ file: activity.service.ts ~ line 83 ~ ActivityService ~ fetchUpcomingActivities ~ error',
        err
      );
    }
  }
  async filterActivities(filter: ActivityFilter) {
    try {
      if (filter.searchText) {
        this.http
          .get<Activity[]>(`${this.apiUrl}?description=${filter.searchText}`)
          .subscribe((data) => {
            this.filteredActivitiesByDescription.next(data);
          });
      }

      if (filter.selectedDate) {
        this.http
          .get<Activity[]>(
            `${this.apiUrl}?endDate=${filter.selectedDate}&startDate=${filter.selectedDate}`
          )
          .subscribe((data) => {
            this.filteredActivitiesByDate.next(data);
          });
      }

      if (filter.geoArea) {
        this.http
          .get<Activity[]>(`${this.apiUrl}?location=${filter.geoArea}`)
          .subscribe((data) => {
            this.filteredActivitiesByGeoArea.next(data);
          });
      }

      if (filter.interests) {
        this.http
          .get<Activity[]>(`${this.apiUrl}?interests=${filter.interests}`)
          .subscribe((data) => {
            this.filteredActivitiesByInterests.next(data);
          });
      }

      return { error: null, isSuccess: true };
    } catch (error) {
      console.log(
        '🚀 ~ file: activity.service.ts ~ line 39 ~ ActivityService ~ filterActivities ~ error',
        error
      );
      return { error: error, isSuccess: false };
    }
  }

  updateActivity(activity: Activity) {
    console.log('###',JSON.stringify(activity) );
    return this.http.put<Activity>(
     this.apiUrl, 
     JSON.stringify(activity),
     this.HttpHeaderResponse)
     .subscribe(
      (val) => {
          console.log("put call successful value returned in body", 
                      val);
      },
      response => {
          console.log("put call in error", response);
      },
      () => {
          console.log("The put observable is now completed.");
      });
  }

  deleteActivity(activityId) {
    this.http.delete<Activity>(
      this.apiUrl,
      {
        body: {activityId}
      }      
    )
    .subscribe( (val) => {
      console.log("successful delete", 
                  val);
  },
  response => {
      console.log("delete call in error", response);
  },
  () => {
      console.log("The delete is now completed.");
  });
    this.router.navigateByUrl(`/Home`);
  }

  createNewActivity(activity: Activity){
    console.log('###',JSON.stringify(activity) );
    return this.http.post<Activity>(
     this.apiUrl, 
     JSON.stringify(activity),
     this.HttpHeaderResponse)
     .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });

}


  navToActivity(activity: Activity) {
    console.log(`entered - ${activity._id}`);
    this.displayedActivityDetails = activity;
    this.router.navigateByUrl(`/activity-details/${activity._id}`);
  }
  

  toPrettyDate(date: string) {
    let activityDate = new Date(date);
    let day = activityDate.getDate();
    let month = activityDate.getMonth() + 1;
    let weekDay = Weekdays[activityDate.getDay()];
    return `${(day > 9 ? '' : '0') + day}/${
      (month > 9 ? '' : '0') + month
    }, ${weekDay}`;
  }
  httpOptions<T>(_apiUrl: string, _activity: Activity, _httpOptions: any) {
  throw new Error('Function not implemented.');
}

}

