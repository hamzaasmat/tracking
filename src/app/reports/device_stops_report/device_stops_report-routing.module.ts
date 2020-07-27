import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceStopsReportComponent } from './device_stops_report.component';
import { AuthGuard } from '../../authantication/guard/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DeviceStopsReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceStopsReportRoutingModule { }
