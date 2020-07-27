import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { AddEditModalComponent } from './add_editModal.component';
@NgModule({
    declarations: [
        AddEditModalComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [
        AddEditModalComponent
    ],
    entryComponents: [
        AddEditModalComponent
    ]
})
export class AddEditModalModule { }
