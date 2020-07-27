import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceTripsReportComponent } from './device_trips_report.component';
import { AuthGuard } from '../../authantication/guard/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DeviceTripsReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceTripsReportRoutingModule { }
