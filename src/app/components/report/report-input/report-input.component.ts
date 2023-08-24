import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DATE_FORMAT_SHORT, STORAGE_KEY_PROBLEM, WORKDAY_END, WORKDAY_LENGTH, WORKDAY_START } from 'src/app/config/config';
import { Problem } from 'src/app/models/problem.interface';
import { DeadlineService } from 'src/app/services/deadline.service';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Deadline } from 'src/app/models/deadline.interface';

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
    startHour: [WORKDAY_START, [Validators.required, Validators.min(WORKDAY_START), Validators.max(WORKDAY_END), this.intValidator()]],
    turnaroundTime: [WORKDAY_LENGTH, [Validators.required, Validators.min(1), this.intValidator()]],
  });

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private deadlineService: DeadlineService,
    private lsService: LocalstorageService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getDeadline(problem: Problem): void {
    this.subscriptions.add(
      this.deadlineService.getDeadline(problem).subscribe(
        (deadline) => {
          if (deadline) {
            this.lsService.addToList<Deadline>(STORAGE_KEY_PROBLEM, deadline);
          }
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

  public clearList(): void {
    this.lsService.clear();
    window.dispatchEvent(new Event('dataUpdated'));
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
