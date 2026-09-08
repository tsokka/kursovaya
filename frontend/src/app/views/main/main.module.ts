import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {SharedModule} from '../../shared';
import {MainComponent} from './main.component';

const routes: Routes = [
  {path: '', component: MainComponent}
];

@NgModule({
  declarations: [MainComponent],
  imports: [SharedModule, CarouselModule, RouterModule.forChild(routes)]
})
export class MainModule {
}
