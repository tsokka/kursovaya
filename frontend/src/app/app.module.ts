import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {MainComponent} from './views/main/main.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {CarouselModule} from "ngx-owl-carousel-o";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './views/user/login/login.component';
import {SignupComponent} from './views/user/signup/signup.component';
import {PolicyComponent} from './views/policy/policy.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {RequestPopupComponent} from './shared/components/request-popup/request-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { ArticleCardComponent } from './shared/components/article-card/article-card.component';
import { BlogComponent } from './views/blog/blog.component';
import { CategoryFilterComponent } from './shared/components/category-filter/category-filter.component';

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
    CategoryFilterComponent
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
    MatDialogModule
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
