import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBottomSheetComponent } from './widget_bottomSheet.component'
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        WidgetBottomSheetComponent
    ],
    imports: [
        CommonModule,
        MatBottomSheetModule,
        MatButtonModule,
        FormsModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [WidgetBottomSheetComponent],
    entryComponents: [
        // WidgetBottomSheetComponent
    ],
    providers: [
        {
            provide: MatBottomSheetRef,
            useValue: {}
        },
        {
            provide: MAT_BOTTOM_SHEET_DATA,
            useValue: {}
        },
        { provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    ]
})
export class ListModule { }
