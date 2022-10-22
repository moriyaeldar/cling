import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/activity/activity.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  //backgroundClass = 'background-color: black';
  //isOnFocus = false;

  currentPath = "";
  homepageOnFocus = false;
  newactivityOnFocus = false;
  profilOnFocus = false;

  constructor(private router: Router, private activityService: ActivityService) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;
    console.log(this.router.url);
  }
  ngAfterContentChecked() : void{
    let route =  this.router.url.substring(1);
    if(route){
      this.changeColor(route);
    }

  }
  changeColor(srcButton){
    // console.log(srcButton);

    switch(srcButton) {
      case "home-page": {
        this.homepageOnFocus = true;
        this.newactivityOnFocus = false;
        this.profilOnFocus = false;
          break;
      }
      case "new-activity": {
        this.homepageOnFocus = false;
        this.newactivityOnFocus = true;
        this.profilOnFocus = false;
        this.activityService.editDisplayedActivity = false;
          break;
      }
      case "profile": {
        this.homepageOnFocus = false;
        this.newactivityOnFocus = false;
        this.profilOnFocus = true;
        break;
      }
    }
  }
}
