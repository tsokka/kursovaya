import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxMaskModule} from 'ngx-mask';
import {ArticleCardComponent, CategoryFilterComponent, RequestPopupComponent} from './components';
import {ClickOutsideDirective} from './directives';

@NgModule({
  declarations: [
    ArticleCardComponent,
    CategoryFilterComponent,
    RequestPopupComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxMaskModule.forChild()
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ArticleCardComponent,
    CategoryFilterComponent,
    RequestPopupComponent,
    ClickOutsideDirective
  ]
})
export class SharedModule {
}
