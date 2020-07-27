import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceEventsReportComponent } from './device_events_report.component';
import { AuthGuard } from '../../authantication/guard/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DeviceEventsReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceEventsReportRoutingModule { }
