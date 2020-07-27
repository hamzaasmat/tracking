import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceTripsReportRoutingModule } from './device_trips_report-routing.module';
import { DeviceTripsReportComponent } from './device_trips_report.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { WidgetTableModule } from 'src/app/shared/widgets/widget_table/widget_table.module';
@NgModule({
  declarations: [
    DeviceTripsReportComponent,
  ],
  imports: [
    CommonModule,
    DeviceTripsReportRoutingModule,
    MaterialModule,
    WidgetTableModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class DeviceTripsReportModule { }
