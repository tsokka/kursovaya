import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared';
import {PolicyComponent} from './policy.component';

const routes: Routes = [
  {path: '', component: PolicyComponent}
];

@NgModule({
  declarations: [PolicyComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class PolicyModule {
}
