import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from "agm-overlays";
import { ComMapComponent } from './commap.component';
import { AgmDirectionModule } from 'agm-direction';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    ComMapComponent
  ],
  imports: [
    CommonModule,
    AgmDirectionModule.forRoot(),
    AgmOverlays,
    MaterialModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyAqg28Lg8qNeQIGohbFbLxykWGx1ppQtG0'
      apiKey: 'AIzaSyDNkBvYP3usb8SkIl_ZGbbLX2Jn6EZq3F0'
    }),
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
    ComMapComponent
  ],
  entryComponents: []
})
export class ComMapModule { }
