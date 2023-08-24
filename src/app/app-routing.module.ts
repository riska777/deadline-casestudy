import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportContainerComponent } from './components/report/report-container/report-container.component';

const routes: Routes = [
  { path: "", component: ReportContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
