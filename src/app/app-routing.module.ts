import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('../app/authantication/login/login.module').then((m) => m.LoginModule) },
  { path: 'home', loadChildren: () => import('../app/home/home.module').then((m) => m.HomeModule) },
  { path: 'map', loadChildren: () => import('../app/maps/commap/commap.module').then((m) => m.ComMapModule) },
  { path: 'deviceroute', loadChildren: () => import('../app/reports/device_route_report/device_route_report.module').then((m) => m.DeviceRouteReportModule) },
  { path: 'deviceevents', loadChildren: () => import('../app/reports/device_events_report/device_events_report.module').then((m) => m.DeviceEventsReportModule) },
  { path: 'devicetrips', loadChildren: () => import('../app/reports/device_trips_report/device_trips_report.module').then((m) => m.DeviceTripsReportModule) },
  { path: 'devicestops', loadChildren: () => import('../app/reports/device_stops_report/device_stops_report.module').then((m) => m.DeviceStopsReportModule) },
  { path: 'devicesummary', loadChildren: () => import('../app/reports/device_summary_report/device_summary_report.module').then((m) => m.DeviceSummaryReportModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
