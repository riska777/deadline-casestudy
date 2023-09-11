import { TestBed } from '@angular/core/testing';

import { DeadlineService } from './deadline.service';
import { Problem } from '../models/problem.interface';
import { Deadline } from '../models/deadline.interface';

describe('DeadlineService', () => {
  let service: DeadlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeadlineService]
    });
    service = TestBed.inject(DeadlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate deadline for 8 business hours', () => {
    const mockProblem: Problem = { submitDate: "8/25/2023 9:00:00", turnaroundTime: 8 };
    const expectedDeadline: Deadline = {
      "turnaroundTime": 8,
      "taskStartDate": "8/25/2023, 09:00:00",
      "taskEndDate": "8/25/2023, 17:00:00",
      taskEndDateUnformatted: new Date("8/25/2023, 17:00:00").getTime()
    };
    const result$ = service.getDeadline(mockProblem);
    result$.subscribe(result => {
      expect(result).toEqual(expectedDeadline);
    });
  });

  it('should calculate deadline for 72 business hours', () => {
    const mockProblem: Problem = { submitDate: "8/11/2023 9:00:00", turnaroundTime: 72 };
    const expectedDeadline: Deadline = {
      "turnaroundTime": 72,
      "taskStartDate": "8/11/2023, 09:00:00",
      "taskEndDate": "8/23/2023, 17:00:00",
      taskEndDateUnformatted: new Date("8/23/2023, 17:00:00").getTime()
    };
    const result$ = service.getDeadline(mockProblem);
    result$.subscribe(result => {
      expect(result).toEqual(expectedDeadline);
    });
  });

  it('should calculate deadline for 16 business hours', () => {
    const mockProblem: Problem = { submitDate: "8/15/2023 9:00:00", turnaroundTime: 16 };
    const expectedDeadline: Deadline = {
      "turnaroundTime": 16,
      "taskStartDate": "8/15/2023, 09:00:00",
      "taskEndDate": "8/16/2023, 17:00:00",
      taskEndDateUnformatted: new Date("8/16/2023, 17:00:00").getTime()
    };
    const result$ = service.getDeadline(mockProblem);
    result$.subscribe(result => {
      expect(result).toEqual(expectedDeadline);
    });
  });

  it('should calculate deadline for 8 business hours', () => {
    const mockProblem: Problem = { submitDate: "8/15/2023 12:00:00", turnaroundTime: 8 };
    const expectedDeadline: Deadline = {
      "turnaroundTime": 8,
      "taskStartDate": "8/15/2023, 12:00:00",
      "taskEndDate": "8/16/2023, 12:00:00",
      taskEndDateUnformatted: new Date("8/16/2023, 12:00:00").getTime()
    };
    const result$ = service.getDeadline(mockProblem);
    result$.subscribe(result => {
      expect(result).toEqual(expectedDeadline);
    });
  });

  it('should calculate deadline for 24 business hours', () => {
    const mockProblem: Problem = { submitDate: "8/31/2023 9:00:00", turnaroundTime: 24 };
    const expectedDeadline: Deadline = {
      "turnaroundTime": 24,
      "taskStartDate": "8/31/2023, 09:00:00",
      "taskEndDate": "9/4/2023, 17:00:00",
      taskEndDateUnformatted: new Date("9/4/2023, 17:00:00").getTime()
    };
    const result$ = service.getDeadline(mockProblem);
    result$.subscribe(result => {
      expect(result).toEqual(expectedDeadline);
    });
  });

  it('should calculate deadline for 10 business hours', () => {
    const mockProblem: Problem = { submitDate: "8/21/2023 9:00:00", turnaroundTime: 10 };
    const expectedDeadline: Deadline = {
      "turnaroundTime": 10,
      "taskStartDate": "8/21/2023, 09:00:00",
      "taskEndDate": "8/22/2023, 11:00:00",
      taskEndDateUnformatted: new Date("8/22/2023, 11:00:00").getTime()
    };
    const result$ = service.getDeadline(mockProblem);
    result$.subscribe(result => {
      expect(result).toEqual(expectedDeadline);
    });
  });
});
