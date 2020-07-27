import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetTable } from './widget_table.component'
import { MaterialModule } from '../../material/material.module';

@NgModule({
    declarations: [
        WidgetTable
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [WidgetTable],
    entryComponents: [
        // WidgetBottomSheetComponent
    ],
    providers: [

    ]
})
export class WidgetTableModule { }
