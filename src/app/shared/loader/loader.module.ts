import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { LoaderComponent } from './loader.component';

@NgModule({
    declarations: [
        LoaderComponent
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
    exports: [LoaderComponent],
    entryComponents: [

    ],
    providers: [

    ]
})
export class LoaderModule { }
