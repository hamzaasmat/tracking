import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceRouteReportRoutingModule } from './device_route_report-routing.module';
import { DeviceRouteReportComponent } from './device_route_report.component';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AgmOverlays } from 'agm-overlays';
import { WidgetTableModule } from 'src/app/shared/widgets/widget_table/widget_table.module';
@NgModule({
  declarations: [
    DeviceRouteReportComponent,
  ],
  imports: [
    CommonModule,
    DeviceRouteReportRoutingModule,
    MaterialModule,
    AgmOverlays,
    WidgetTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqg28Lg8qNeQIGohbFbLxykWGx1ppQtG0'
    }),
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class DeviceRouteReportModule { }
