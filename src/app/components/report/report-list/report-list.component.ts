import { Component } from '@angular/core';
import { catchError, fromEvent, map, Observable, of, startWith } from 'rxjs';
import { STORAGE_KEY_PROBLEM } from 'src/app/config/config';
import { Deadline } from 'src/app/models/deadline.interface';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent {
  public deadlineList$: Observable<Deadline[]> = of([]);
  private dataUpdated$ = fromEvent(window, 'dataUpdated');
  
  constructor (
    private lsService: LocalstorageService
  ) { 
    this.deadlineList$ = this.dataUpdated$.pipe(
      startWith(true),
      map(dataUpdated => this.lsService.getListValue<Deadline>(STORAGE_KEY_PROBLEM))
    );
  }

}
