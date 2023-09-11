import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, combineLatest, fromEvent, map, startWith, tap } from 'rxjs';
import { STORAGE_KEY_PROBLEM } from 'src/app/config/config';
import { Deadline } from 'src/app/models/deadline.interface';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent {

  private dataUpdated$ = fromEvent(window, 'dataUpdated');

  constructor (
    private lsService: LocalstorageService
  ) { }

  public deadlineList$: Observable<Deadline[]> = this.dataUpdated$.pipe(
    startWith(true),
    map(dataUpdated => {
      return this.lsService.getListValue<Deadline>(STORAGE_KEY_PROBLEM)
    })
  );
}
