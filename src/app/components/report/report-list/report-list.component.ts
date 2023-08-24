import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { STORAGE_KEY_PROBLEM } from 'src/app/config/config';
import { Deadline } from 'src/app/models/deadline.interface';
import { Problem } from 'src/app/models/problem.interface';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit, OnDestroy {

  private dataUpdated$ = fromEvent(window, 'dataUpdated');
  private subscription = new Subscription();

  constructor (
    private lsService: LocalstorageService
  ) { }

  public deadlineList: Deadline[] = this.updateListView();

  ngOnInit(): void {
    this.subscription.add(
      this.dataUpdated$.subscribe(
        (windowEvent) => {
          this.updateListView()
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateListView(): Deadline[] {
    const deadlineList = this.lsService.getListValue<Deadline>(STORAGE_KEY_PROBLEM);
    this.deadlineList = deadlineList;
    return deadlineList;
  }
}
