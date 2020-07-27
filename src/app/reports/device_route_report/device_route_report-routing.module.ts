import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceRouteReportComponent } from './device_route_report.component';
import { AuthGuard } from '../../authantication/guard/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DeviceRouteReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRouteReportRoutingModule { }
