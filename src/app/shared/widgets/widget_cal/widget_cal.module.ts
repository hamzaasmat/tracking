import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetDialogCalComponent } from './widget_cal.component'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDatepickerModule } from '@angular/material';

@NgModule({
    declarations: [
        WidgetDialogCalComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        FormsModule,
        MatDialogModule,
        MatDatepickerModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [WidgetDialogCalComponent],
    entryComponents: [
        WidgetDialogCalComponent
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: {}
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        }
    ]
})
export class WidgetDialogCalModule { }
