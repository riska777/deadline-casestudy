import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DATE_FORMAT_SHORT } from 'src/app/config/config';
import { DeadlineService } from 'src/app/services/deadline.service';

@Component({
  selector: 'app-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss'],
  providers: [
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: { parse: {}, display: { dateTimeInput: DATE_FORMAT_SHORT } } }
  ]
})
export class ReportInputComponent implements OnInit {
  public problemReportForm: FormGroup = this.fb.group({
    reportDateTime: [null, Validators.required],
    startHour: [9, [Validators.required, Validators.min(9), Validators.max(17), this.intValidator()]],
    turnaroundTime: [10, [Validators.required, Validators.min(1), this.intValidator()]],
  });;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private deadlineService: DeadlineService,
  ) { }

  ngOnInit(): void { }

  public submitForm(): void {
    if (this.problemReportForm.valid) {
      const formData = this.problemReportForm.value;
      console.log('Form data submitted:', formData);
      const formattedDate = this.datePipe.transform(this.problemReportForm.value.reportDateTime, DATE_FORMAT_SHORT);
      console.log('Formatted Date:', formattedDate);
    } else {
      console.log('Form is invalid. Please check the inputs.');
    }
  }

  private intValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const pattern = /^[0-9]+$/;
      if (control.value === null || control.value === '') {
        return null;
      }
      if (pattern.test(control.value)) {
        return null;
      } else {
        return { 'notInteger': true };
      }
    };
  }
}
