import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {LoginComponent} from "./views/user/login/login.component";
import {SignupComponent} from "./views/user/signup/signup.component";
import {PolicyComponent} from "./views/policy/policy.component";
import {AuthForwardGuard} from "./core/auth/auth-forward.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {path: 'login', component: LoginComponent, canActivate: [AuthForwardGuard]},
      {path: 'signup', component: SignupComponent, canActivate: [AuthForwardGuard]},
      {path: 'policy', component: PolicyComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
