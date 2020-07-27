import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatCheckboxModule, _MatCheckboxRequiredValidatorModule} from '@angular/material/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolBarComponent } from './shared/widgets/widget_toolBar/toolbar.component';
import { LayoutService } from './shared/services/layout.service';
import { CookieService } from 'ngx-cookie-service';
import { LoaderInterceptorService } from './shared/services/loaderInterceptorService';
import { LoaderModule } from './shared/loader/loader.module';
import { MaterialModule } from './shared/material/material.module'
import { ToolBarModule } from './shared/widgets/widget_toolBar/toolbar.module';

@NgModule({
  declarations: [
    AppComponent,
    // ToolBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LoaderModule,
    ToolBarModule
    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true
    //   }
    // })
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    LayoutService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
