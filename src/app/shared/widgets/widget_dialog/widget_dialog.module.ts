import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetDialogComponent } from './widget_dialog.component'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDatepickerModule } from '@angular/material';

@NgModule({
    declarations: [
        WidgetDialogComponent
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
    exports: [WidgetDialogComponent],
    entryComponents: [
        WidgetDialogComponent
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
export class WidgetDialogModule { }
