import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})

export class ProfileEditComponent implements OnInit {

  profileForm: FormGroup;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  constructor(private _location: Location, builder: FormBuilder, public userService: UserService, public dialog: MatDialog) {
    this.profileForm = builder.group({
      firstName: userService.user.firstName,
      lastName: userService.user.lastName,
      email: userService.user.email,
      phoneNumber: userService.user.phoneNumber,
      age: userService.user.age,
      location: userService.user.location,
      interests: [userService.user.interests],
      aboutMe: userService.user.aboutMe,
      file: null
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      let currentInterests = this.profileForm.controls.interests.value;
      currentInterests.push(value)
      this.profileForm.controls["interests"].setValue(currentInterests)
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(interest: string): void {
    const index = this.profileForm.controls.interests.value.indexOf(interest);

    if (index >= 0) {
      let currentInterests = this.profileForm.controls.interests.value;
      currentInterests.splice(index, 1);
      this.profileForm.controls["interests"].setValue(currentInterests)
    }
  }

  handleFileInput(files: FileList) {
    this.profileForm.controls["file"].setValue(files.item(0));
  }

  goBack() {
    this._location.back();
  }

  ngOnInit(): void {}

  submit() {
    let payload = this.profileForm.getRawValue()
    console.log('validate', this.profileForm.valid);
    console.log('payload', payload);
    // this.userService.updateUserDetails(payload);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'עודכן בהצלחה !',
        message: 'פרטי המשתמש החדשים נשמרו',
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.goBack();
    });
  }
}
