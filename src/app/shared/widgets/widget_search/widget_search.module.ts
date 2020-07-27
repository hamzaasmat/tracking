import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetSearchComponent } from './widget_search.component'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';

@NgModule({
    declarations: [
        WidgetSearchComponent
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
    exports: [WidgetSearchComponent],
    entryComponents: [
        
    ],
    providers: [
        
    ]
})
export class WidgetSearchModule { }
