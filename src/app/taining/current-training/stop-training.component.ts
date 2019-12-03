import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-stop-training',
    template: `
    <h1 mat-dialog-title>Are You Sure?<h1>
    <mat-dialog-content> Your Progress : {{passedData.progress}}%</mat-dialog-content>
    <button mat-button [mat-dialog-close]="true">Yes</button>
    <button mat-button [mat-dialog-close]="false">No</button>
  `
})
export class StopTrainingDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData) { }
}