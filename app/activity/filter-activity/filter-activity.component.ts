import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PickLocationComponent } from 'src/app/dialogs/pick-location/pick-location.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivityService } from '../activity.service';
import { ActivityFilter } from '../activity-filter.model';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-filter-activity',
  templateUrl: './filter-activity.component.html',
  styleUrls: ['./filter-activity.component.css'],
})
export class FilterActivityComponent implements OnInit {
  @Output() filterEmit: EventEmitter<ActivityFilter> =
    new EventEmitter<ActivityFilter>();
    @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

  form: FormGroup;
  submitted: boolean = false;

  isLocationPicked: boolean = false;
  location: string = '';
  geoArea: 'צפון' | 'מרכז' | 'דרום';
  selectedDate: Date = new Date();
  private toggleActivityFilterMenuSub: Subscription;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
   this.restartForm();
  }

  restartForm(){
    this.form = this.formBuilder.group({
      interests: ['', []],
      searchText: ['', []],
      range: [0, []],
    });
  }

  // handle filter input
  submit(): void {
    let formattedUtcDate = null;
    if (this.selectedDate?.toISOString) {
      formattedUtcDate = this.selectedDate.toISOString();
    }

    const payload = {
      ...this.form.getRawValue(),
      geoArea: this.geoArea,
      selectedDate: formattedUtcDate,
    };

    this.filterEmit.emit(payload);

    //close/open menu
    this.activityService.toggleMenu(false);
  }

  openDialog(): void {
    console.log(
      '🚀 ~ file: filter-activity.component.ts ~ line 42 ~ FilterActivityComponent ~ openDialog ~ this.location',
      this.location
    );
    this.dialog.open(PickLocationComponent, {
      width: '250px',
      data: { location: this.location },
    });
  }

  formatLabel(value: number) {
    return `${value}km`;
  }

  pickArea(area: 'צפון' | 'מרכז' | 'דרום') {
    this.geoArea = area;
  }

  // setting date to dd/mm/yyyy string
  toPrettyDate(date: Date | null) {
    if (date == null || !date.toLocaleDateString) {
      return '';
    }

    return date.toLocaleDateString('he-IL');
  }

  cancelFilter(){
    this.restartForm();
    this.selectedDate = new Date();
    this.geoArea = null;
    this.calendar.activeDate = new Date();
    this.activityService.toggleMenu(false);
  }
}
