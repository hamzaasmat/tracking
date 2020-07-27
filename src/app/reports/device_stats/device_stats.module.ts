import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDeviceStats } from './device_stats.component';
import { WidgetDialogModule } from 'src/app/shared/widgets/widget_dialog/widget_dialog.module';
import { WidgetDialogCalModule } from 'src/app/shared/widgets/widget_cal/widget_cal.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
    declarations: [
        ReportDeviceStats
    ],
    imports: [
        CommonModule,
        WidgetDialogModule,
        WidgetDialogCalModule,
        MaterialModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [
        ReportDeviceStats
    ],
    entryComponents: [
    ]
})
export class ReportStatsModule { }
