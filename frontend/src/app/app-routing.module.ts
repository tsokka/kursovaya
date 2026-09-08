import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./shared";
import {
  MainComponent,
  BlogComponent,
  ArticleComponent,
  PolicyComponent,
  LoginComponent,
  SignupComponent
} from "./views";
import {AuthForwardGuard} from "./core";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {path: 'login', component: LoginComponent, canActivate: [AuthForwardGuard]},
      {path: 'signup', component: SignupComponent, canActivate: [AuthForwardGuard]},
      {path: 'policy', component: PolicyComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'article/:url', component: ArticleComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
