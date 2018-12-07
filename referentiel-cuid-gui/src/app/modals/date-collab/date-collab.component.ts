import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

export interface DateCollab{
  affectation: Date,
  liberation: Date
}

@Component({
  selector: 'app-date-collab',
  templateUrl: './date-collab.component.html',
  styleUrls: ['./date-collab.component.scss']
})
export class DateCollabModalComponent implements OnInit {

  dates: DateCollab;

  dateaffectation = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  dateliberation = new FormControl('', [
    Validators.nullValidator
  ]);

  constructor(
    public dialogRef: MatDialogRef<DateCollabModalComponent>
    ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {

    this.dates = {affectation: this.dateaffectation.value, liberation: this.dateliberation.value}
    this.dialogRef.close(this.dates);
  }
}
