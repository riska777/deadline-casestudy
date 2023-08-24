import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DATE_FORMAT_SHORT } from 'src/app/config/config';
import { Deadline } from 'src/app/models/deadline.interface';
import { Problem } from 'src/app/models/problem.interface';
import { DeadlineService } from 'src/app/services/deadline.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss'],
  providers: [
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: { parse: {}, display: { dateTimeInput: DATE_FORMAT_SHORT } } }
  ]
})
export class ReportInputComponent implements OnDestroy {
  public problemReportForm: FormGroup = this.fb.group({
    reportDateTime: [null, Validators.required],
    startHour: [9, [Validators.required, Validators.min(9), Validators.max(17), this.intValidator()]],
    turnaroundTime: [10, [Validators.required, Validators.min(1), this.intValidator()]],
  });

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private deadlineService: DeadlineService,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getDeadline(problem: Problem): void {
    this.subscriptions.add(
      this.deadlineService.getDeadline(problem).subscribe(
        (deadline) => {
          console.log("deadline", deadline);
        }
      ),
    );
  }

  public submitForm(): void {
    if (this.problemReportForm.valid) {
      const formData = this.problemReportForm.value;
      const date = this.datePipe.transform(formData.reportDateTime, DATE_FORMAT_SHORT);
      const formattedDate = `${date} ${formData.startHour}:00:00`;

      this.getDeadline({
        submitDate: formattedDate,
        turnaroundTime: formData.turnaroundTime
      });
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
