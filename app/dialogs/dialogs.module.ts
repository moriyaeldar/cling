import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickLocationComponent } from './pick-location/pick-location.component';
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    PickLocationComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class DialogsModule { }
