import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetClockComponent } from './widget_clock.component'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';

@NgModule({
    declarations: [
        WidgetClockComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        FormsModule,
        MatIconModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [WidgetClockComponent],
    entryComponents: [
        
    ],
    providers: [
        
    ]
})
export class WidgetClockModule { }
