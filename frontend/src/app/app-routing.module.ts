import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./shared";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'blog', loadChildren: () => import('./views/blog/blog.module').then(m => m.BlogModule)},
      {path: 'article', loadChildren: () => import('./views/article/article.module').then(m => m.ArticleModule)},
      {path: 'policy', loadChildren: () => import('./views/policy/policy.module').then(m => m.PolicyModule)},
      {path: 'login', loadChildren: () => import('./views/user/login/login.module').then(m => m.LoginModule)},
      {path: 'signup', loadChildren: () => import('./views/user/signup/signup.module').then(m => m.SignupModule)},
      {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
