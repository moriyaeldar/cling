import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/activity/activity.service';
import { Activity } from 'src/app/models/Activity';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  activities: Activity[];
  username: string = 'יובל פיטלוק';
  location: string = 'רמת גן';
  age: number = 24;
  profileImg: string = "assets/icons/google.png";
  userTxt: string = ` .חשגרמו ישגרמ ,ףוקליס םודנדא דרפנומ סרולוק .תנמ ןסומ טעמפל .הצגור ךנילב
  םומאיל רומוד זיווק .שידדג םעיתלו - גשרב םעיתפל - טויעמו טוצ ,לוד ,ופמיכל
  סא לקרמל ודנילב לפנטצת .קבולב ריטחס תילא גניסיפידא ררוטקסנוק ,טמא טיס
  רולוד םוספיא םרול`;
  labels: string[] = ['ספורט', 'ים'];
  futureActivities = [
    {
      imgSrc: 'assets/icons/activity.jpg',
      name: 'ציור ויצירה',
      location: 'בן יהודה 71, תל אביב',
      date: '30.06 || 12:00',
    },
    {
      imgSrc: 'assets/icons/activity.jpg',
      name: 'ציור ויצירה',
      location: 'בן יהודה 71, תל אביב',
      date: '30.06 || 12:00',
    },
    {
      imgSrc: 'assets/icons/activity.jpg',
      name: 'ציור ויצירה',
      location: 'בן יהודה 71, תל אביב',
      date: '30.06 || 12:00',
    },
  ];
  pastActivities = [
    {
      imgSrc: 'assets/icons/activity.jpg',
      name: 'אימון',
      location: 'בן יהודה 71, תל אביב',
      date: '30.06 || 12:00',
    },
    {
      imgSrc: 'assets/icons/activity.jpg',
      name: 'אימון',
      location: 'בן יהודה 71, תל אביב',
      date: '30.06 || 12:00',
    },
    {
      imgSrc: 'assets/icons/activity.jpg',
      name: 'אימון',
      location: 'בן יהודה 71, תל אביב',
      date: '30.06 || 12:00',
    },
    {
      imgSrc: 'assets/icons/activity.jpg',
      name: 'אימון',
      location: 'בן יהודה 71, תל אביב',
      date: '30.06 || 12:00',
    },
    {
      imgSrc: 'assets/icons/activity.jpg',
      name: 'אימון',
      location: 'בן יהודה 71, תל אביב',
      date: '30.06 || 12:00',
    },
  ];

  constructor(private _location: Location, private router: Router, private activitiesService: ActivityService) {
    this.activities = activitiesService.activitiesData
    console.log("user ac",this.activities);

  }

  ngOnInit(): void {}

  goBack() {
    this._location.back();
  }
  navToProfileEdit(){
    this.router.navigateByUrl("/profile-edit")
  }

}
