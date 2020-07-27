import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceStopsReportRoutingModule } from './device_stops_report-routing.module';
import { DeviceStopsReportComponent } from './device_stops_report.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { WidgetTableModule } from 'src/app/shared/widgets/widget_table/widget_table.module';
@NgModule({
  declarations: [
    DeviceStopsReportComponent,
  ],
  imports: [
    CommonModule,
    DeviceStopsReportRoutingModule,
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
export class DeviceStopsReportModule { }
