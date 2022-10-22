import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbTimepicker,
  NgbPopover,
} from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../activity.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css'],
})
export class NewActivityComponent implements OnInit {
  show = true;
  myText = '';
  model: NgbDateStruct;
  date: { year: number; month: number };
  time = { hour: 13, minute: 30 };
  isEditMode: boolean = false;
  geoArea: 'צפון' | 'מרכז' | 'דרום';
  selectedDate: Date;
  fileToUpload: File | null = null;
  activityForm: FormGroup;
  minDate = new Date();

  constructor(
    private calendar: NgbCalendar,
    private router: Router,
    builder: FormBuilder,
    private activityService: ActivityService,
    public dialog: MatDialog
  ) {
    this.isEditMode = this.activityService.editDisplayedActivity;
    this.selectedDate = this.isEditMode
      ? new Date(this.activityService.displayedActivityDetails?.date)
      : new Date();
    // TODO add geoArea to activity model and to JSON file
    // TODO add validations
    // this.geoArea = this.isEditMode ? this.activityService.displayedActivityDetails?.geoArea : '';
    this.activityForm = builder.group({
     
      title: [
        this.isEditMode
          ? this.activityService.displayedActivityDetails?.title
          : '',
      ],
      description: [
        this.isEditMode
          ? this.activityService.displayedActivityDetails?.description
          : '',
      ],
      date: [this.selectedDate],
      timeFrame: [
        this.isEditMode
          ? this.activityService.displayedActivityDetails?.timeFrame
          : '00:00',
      ],
     
      location: [
        this.isEditMode
          ? this.activityService.displayedActivityDetails?.location
          : '',
      ],
      photo: [
        this.isEditMode
          ? this.activityService.displayedActivityDetails?.photo
          : 'assets/icons/activity.jpg',
      ],
      price: [
        this.isEditMode
          ? this.activityService.displayedActivityDetails?.price
          : '',
      ],
      groupSize: [
        this.isEditMode
          ? this.activityService.displayedActivityDetails?.groupSize
          : 2,
      ],
      // age: [
      //   this.isEditMode
      //     ? this.activityService.displayedActivityDetails?.age
      //     : '',
      // ],
      repeated: [
        this.isEditMode
          ? this.activityService.displayedActivityDetails?.repeated
          : 0,
      ],
      // IsConfirmationRequired: [
      //   this.isEditMode
      //     ? this.activityService.displayedActivityDetails
      //         ?.IsConfirmationRequired
      //     : '',
      // // ],
      // status: [
      //   this.isEditMode
      //     ? this.activityService.displayedActivityDetails?.status
      //     : '',
      // ],
    });
  }

  ngOnInit(): void {}

  backToHome() {
    this.router.navigateByUrl('/Home');
  }
  pickArea(area: 'צפון' | 'מרכז' | 'דרום') {
    this.geoArea = area;
  }

  submit() {
    let payload = {
      ...this.activityForm.getRawValue(),
      geoArea: this.geoArea,
      date: this.selectedDate,
    };
    console.log('validate', this.activityForm.valid);
    if (this.isEditMode) {
      this.activityService.displayedActivityDetails = payload;
      let currentActivityIndex = this.activityService.activitiesData.findIndex(
        (activity) => activity._id == payload._id
      );
      this.activityService.activitiesData[currentActivityIndex] = payload;
    } else {
      this.activityService.activitiesData.push(payload);
    }
    console.log('payload', payload);
    this.activityService.createNewActivity(payload);
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: '!הפעילות נשלחה',
        message: 'הפעילות נשלחה לאישור המנהלים',
      },
      autoFocus: false,
    });
    this.backToHome();
  }

  toPrettyDate(date: Date | null) {
    if (date == null) {
      return '';
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${(day > 9 ? '' : '0') + date.getDate()}/${
      (month > 9 ? '' : '0') + month
    }/${year}`;
  }

  addParticipant() {
    let groupSize = this.activityForm.controls['groupSize'].value;
    groupSize++;
    this.activityForm.controls['groupSize'].setValue(groupSize);
  }

  removeParticipant() {
    let groupSize = this.activityForm.controls['groupSize'].value;
    if (groupSize == 2) {
      return alert('בפעילות חייב להיות לכל הפחות 2 משתתפים');
    }
    groupSize--;
    this.activityForm.controls['groupSize'].setValue(groupSize);
  }

  handleSingleFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  handleMultipleFiles(files: FileList[]) {
    console.log(files);
    // this.fileToUpload = files.item(0);
  }
}
