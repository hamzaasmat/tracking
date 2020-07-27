import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetDialogModule } from '../../shared/widgets/widget_dialog/widget_dialog.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from 'src/app/shared/services/loaderInterceptorService';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        WidgetDialogModule,
        MaterialModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [
        LoginComponent
    ],
    entryComponents: [
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptorService,
            multi: true
        }
    ]
})
export class LoginModule { }
