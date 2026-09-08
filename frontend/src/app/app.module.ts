import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {CarouselModule} from "ngx-owl-carousel-o";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {NgxMaskModule} from "ngx-mask";
import {AppComponent} from './app.component';
import {LayoutComponent, HeaderComponent, FooterComponent} from './shared';
import {ArticleCardComponent, CategoryFilterComponent, RequestPopupComponent} from './shared';
import {
  MainComponent,
  BlogComponent,
  ArticleComponent,
  PolicyComponent,
  LoginComponent,
  SignupComponent
} from './views';
import {AuthInterceptor} from './core';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    PolicyComponent,
    RequestPopupComponent,
    ArticleCardComponent,
    BlogComponent,
    CategoryFilterComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatDialogModule,
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
