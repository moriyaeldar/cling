import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Activity } from '../models/Activity';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityResolver implements Resolve<Activity> {

  constructor(
    private activityService: ActivityService,
    private router: Router
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any> | Promise<any> | any>  {
    console.log("id is - ",route.paramMap.get('id'));
    console.log("displayed activity", this.activityService.displayedActivityDetails);

    if(!this.activityService.displayedActivityDetails){
      this.router.navigateByUrl(`/Home`)
    }
    return
  }
}
