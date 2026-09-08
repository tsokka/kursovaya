import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared';
import {ArticleComponent} from './article.component';

const routes: Routes = [
  {path: ':url', component: ArticleComponent}
];

@NgModule({
  declarations: [ArticleComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ArticleModule {
}
