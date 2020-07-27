import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceConfigComponent } from './deviceconfig.component'
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
    declarations: [
        DeviceConfigComponent
    ],
    imports: [
        CommonModule,
        MomentModule,
        MaterialModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [DeviceConfigComponent],
    entryComponents: [
        DeviceConfigComponent
    ],
    providers: [

    ]
})
export class DeviceConfigModule { }
