import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { AttributesComponent } from './attributes.component';
import { CoordinatesModule } from 'angular-coordinates';
@NgModule({
    declarations: [
        AttributesComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CoordinatesModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [
        AttributesComponent
    ],
    entryComponents: [
    ]
})
export class AttributesModule { }
