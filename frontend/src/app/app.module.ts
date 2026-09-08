import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {NgxMaskModule} from "ngx-mask";
import {AppComponent} from './app.component';
import {LayoutComponent, HeaderComponent, FooterComponent, SharedModule} from './shared';
import {AuthInterceptor} from './core';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
