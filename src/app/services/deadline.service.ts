import { Injectable } from '@angular/core';
import { BusinessLength, Deadline } from '../models/deadline.interface';
import { WORKDAYS, WORKDAY_END, WORKDAY_LENGTH, WORKDAY_START } from '../config/config';
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
    const turnaroundTime = problem.turnaroundTime;
    const submitDate = problem.submitDate;
    const businessLengthForTask = this.calcBusinessLengthForTask(turnaroundTime, this.workdayLength);
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
    const calcTaskEndDate = () => {
      const singleDayTask = this.isSingleDayTask(turnaroundTime, this.workdayLength, taskStartDate);

      if (businessLengthForTask.days < 1) {
        taskEndDate.setHours(taskStartDate.getHours() + businessLengthForTask.hours);
      } else {
        if (!singleDayTask) {
          const businessDaysArray = new Array(Math.floor(businessLengthForTask.days)).fill(0);
          /* Add working days to deadline date */
          for (let day in businessDaysArray) {
            const days = taskEndDate.getDate() + 1;
            taskEndDate.setDate(days);
            /* Skip weekend days */
            while (!this.workdays.includes(taskEndDate.getDay())) {
              taskEndDate.setDate(taskEndDate.getDate() + 1);
            }
          }
        }
        /* Add only max possible amount of hours per day */
        const hours = taskEndDate.getHours() + (
          singleDayTask ? turnaroundTime : businessLengthForTask.hours
        );

        taskEndDate.setHours(hours);
      }
    }
    calcTaskEndDate();

    console.log("deadline", turnaroundTime, businessLengthForTask, taskStartDate.toUTCString(), taskEndDate.toUTCString());
    return {
      turnaroundTime,
      businessLengthForTask,
      taskStartDate: taskStartDate.toUTCString(),
      taskEndDate: taskEndDate.toUTCString()
    }
  }

  private isSingleDayTask(turnaroundTime: number, workdayLength: number, taskStartDate: Date): boolean {
    return (taskStartDate.getHours() + turnaroundTime <= this.workdayStart + workdayLength);
  }

  private calcBusinessLengthForTask(turnaroundTime: number, workdayLength: number): BusinessLength {
    let businessLengthForTask = turnaroundTime / workdayLength;
    const addLastDaysAsHours = this.checkAddLastDayAsHours(businessLengthForTask);
    return {
      days: addLastDaysAsHours ? 
        businessLengthForTask - 1 : Math.floor(businessLengthForTask),
      hours: addLastDaysAsHours ? 
        workdayLength : 
        workdayLength * (businessLengthForTask - Math.floor(businessLengthForTask)),
    };
  }

  private checkAddLastDayAsHours(businessLengthForTask: number): boolean {
    return businessLengthForTask >= 2 && businessLengthForTask % 1 == 0;
  }
}
