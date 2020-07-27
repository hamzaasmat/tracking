import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from './toolbar.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
    declarations: [
        ToolBarComponent
    ],
    imports: [
        CommonModule,
        // ToolBarModule,
        MaterialModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [ToolBarComponent],
})
export class ToolBarModule { }
