import { Injectable } from '@angular/core';
import { Deadline } from '../models/deadline.interface';
import { DATETIME_OPTIONS, WORKDAYS, WORKDAY_END, WORKDAY_LENGTH, WORKDAY_START } from '../config/config';
import { Observable, of } from 'rxjs';
import { Problem } from '../models/problem.interface';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

  constructor() { }

  private workdayStart = WORKDAY_START;
  private workdayLength = WORKDAY_LENGTH;
  private workdayEnd = WORKDAY_END;
  private workdays = WORKDAYS;

  public getDeadline(problem: Problem): Observable<Deadline | null> {
    return of(this.calculateDeadline(problem));
  }

  private calculateDeadline(problem: Problem): Deadline | null {
    let workingHoursToAdd = problem.turnaroundTime;
    const turnaroundTime = problem.turnaroundTime;
    const submitDate = problem.submitDate;
    const taskStartDate = new Date(submitDate);
    const taskEndDate = new Date(submitDate);

    /* Problems can only be reported during working hours. */
    if (
      !this.workdays.includes(taskStartDate.getDay()) 
      || taskStartDate.getHours() < this.workdayStart 
      || taskStartDate.getHours() > this.workdayEnd
    ) {
      console.error("You can only report a problem during working hours.");
      return null;
    }

    /* Calculate deadline */
    while (workingHoursToAdd > 0) {
      if (
        this.workdays.includes(taskEndDate.getDay())
        && (taskEndDate.getHours() >= this.workdayStart && taskEndDate.getHours() < this.workdayEnd)
      ) {
        workingHoursToAdd--;
      }

      taskEndDate.setHours(taskEndDate.getHours() + 1);
      if (taskEndDate.getHours() === this.workdayEnd && workingHoursToAdd > 0) {
        taskEndDate.setDate(taskEndDate.getDate() + 1);
        taskEndDate.setHours(this.workdayStart, 0, 0, 0);
      }
    }

    const deadline: Deadline = {
      turnaroundTime,
      taskStartDate: new Intl.DateTimeFormat('en-US', DATETIME_OPTIONS as any).format(taskStartDate),
      taskEndDate: new Intl.DateTimeFormat('en-US', DATETIME_OPTIONS as any).format(taskEndDate),
      taskEndDateUnformatted: taskEndDate
    }
    return deadline;
  }
}
