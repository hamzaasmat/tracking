import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceSummaryReportComponent } from './device_summary_report.component';
import { AuthGuard } from '../../authantication/guard/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DeviceSummaryReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceStopsReportRoutingModule { }
