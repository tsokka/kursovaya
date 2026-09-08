import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared';
import {AuthForwardGuard} from '../../../core/auth';
import {SignupComponent} from './signup.component';

const routes: Routes = [
  {path: '', component: SignupComponent, canActivate: [AuthForwardGuard]}
];

@NgModule({
  declarations: [SignupComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class SignupModule {
}
