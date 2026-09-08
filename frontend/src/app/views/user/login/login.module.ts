import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared';
import {AuthForwardGuard} from '../../../core/auth';
import {LoginComponent} from './login.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthForwardGuard]}
];

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class LoginModule {
}
