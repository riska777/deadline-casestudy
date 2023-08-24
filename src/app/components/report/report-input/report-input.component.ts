import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss']
})
export class ReportInputComponent implements OnInit {
  public problemReportForm: FormGroup = this.fb.group({
    reportDateTime: [null, Validators.required],
    startHour: [0, [Validators.required, Validators.min(9), Validators.max(17)]],
    turnaroundTime: [null, [Validators.required, Validators.min(1)]],
  });;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }
}
