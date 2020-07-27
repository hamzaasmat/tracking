import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DeviceConfigModule } from '../deviceconfig/deviceconfig.module';
import { WidgetDialogModule } from '../shared/widgets/widget_dialog/widget_dialog.module';
import { ComMapModule } from '../maps/commap/commap.module';
import { WidgetSearchModule } from '../shared/widgets/widget_search/widget_search.module';
import { ReportStatsModule } from '../reports/device_stats/device_stats.module';
import { WidgetClockModule } from '../shared/widgets/widget_clock/widget_clock.module';
import { MaterialModule } from '../shared/material/material.module';
import { AddEditModalModule } from './operation/add-edit/add_editModal.module';
import { AttributesModule } from './operation/attributes/attributes.module';
@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DeviceConfigModule,
    WidgetDialogModule,
    ComMapModule,
    AddEditModalModule,
    AttributesModule,
    // WidgetSearchModule,
    ReportStatsModule,
    WidgetClockModule,
    MaterialModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class HomeModule { }
