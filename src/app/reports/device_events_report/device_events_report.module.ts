import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceEventsReportRoutingModule } from './device_events_report-routing.module';
import { DeviceEventsReportComponent } from './device_events_report.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { WidgetTableModule } from 'src/app/shared/widgets/widget_table/widget_table.module';
@NgModule({
  declarations: [
    DeviceEventsReportComponent,
  ],
  imports: [
    CommonModule,
    DeviceEventsReportRoutingModule,
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
export class DeviceEventsReportModule { }
