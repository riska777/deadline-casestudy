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

  it('should calculate and match the deadlines for problem reports', () => {
    const mockProblem1: Problem = { submitDate: "8/25/2023 9:00:00", turnaroundTime: 8 };
    const expectedDeadline1: Deadline = { "turnaroundTime": 8, "businessLengthForTask": { "days": 1, "hours": 0 }, "taskStartDate": "8/25/2023, 09:00:00", "taskEndDate": "8/25/2023, 17:00:00" };

    const mockProblem2: Problem = { submitDate: "8/11/2023 9:00:00", turnaroundTime: 72 };
    const expectedDeadline2: Deadline = { "turnaroundTime": 72, "businessLengthForTask": { "days": 8, "hours": 8 }, "taskStartDate": "8/11/2023, 09:00:00", "taskEndDate": "8/23/2023, 17:00:00" };

    const mockProblem3: Problem = { submitDate: "8/15/2023 9:00:00", turnaroundTime: 16 };
    const expectedDeadline3: Deadline = { "turnaroundTime": 16, "businessLengthForTask": { "days": 1, "hours": 8 }, "taskStartDate": "8/15/2023, 09:00:00", "taskEndDate": "8/16/2023, 17:00:00" };

    const mockProblem4: Problem = { submitDate: "8/15/2023 12:00:00", turnaroundTime: 8 };
    const expectedDeadline4: Deadline = { "turnaroundTime": 8, "businessLengthForTask": { "days": 1, "hours": 0 }, "taskStartDate": "8/15/2023, 12:00:00", "taskEndDate": "8/16/2023, 12:00:00" };

    const mockProblem5: Problem = { submitDate: "8/31/2023 9:00:00", turnaroundTime: 24 };
    const expectedDeadline5: Deadline = { "turnaroundTime": 24, "businessLengthForTask": { "days": 2, "hours": 8 }, "taskStartDate": "8/31/2023, 09:00:00", "taskEndDate": "9/4/2023, 17:00:00" };

    const mockProblem6: Problem = { submitDate: "8/21/2023 9:00:00", turnaroundTime: 10 };
    const expectedDeadline6: Deadline = { "turnaroundTime": 10, "businessLengthForTask": { "days": 1, "hours": 2 }, "taskStartDate": "8/21/2023, 09:00:00", "taskEndDate": "8/22/2023, 11:00:00" };
    
    const result1$ = service.getDeadline(mockProblem1);
    result1$.subscribe(result => {
      expect(result).toEqual(expectedDeadline1);
    });

    const result2$ = service.getDeadline(mockProblem2);
    result2$.subscribe(result => {
      expect(result).toEqual(expectedDeadline2);
    });

    const result3$ = service.getDeadline(mockProblem3);
    result3$.subscribe(result => {
      expect(result).toEqual(expectedDeadline3);
    });

    const result4$ = service.getDeadline(mockProblem4);
    result4$.subscribe(result => {
      expect(result).toEqual(expectedDeadline4);
    });
  
    const result5$ = service.getDeadline(mockProblem5);
    result5$.subscribe(result => {
      expect(result).toEqual(expectedDeadline5);
    });

    const result6$ = service.getDeadline(mockProblem6);
    result6$.subscribe(result => {
      expect(result).toEqual(expectedDeadline6);
    });
  });
});
