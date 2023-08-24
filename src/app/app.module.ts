import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReportListComponent } from './components/report/report-list/report-list.component';
import { ReportInputComponent } from './components/report/report-input/report-input.component';
import { ReportContainerComponent } from './components/report/report-container/report-container.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DeadlineService } from './services/deadline.service';

@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    ReportInputComponent,
    ReportContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [
    DeadlineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
