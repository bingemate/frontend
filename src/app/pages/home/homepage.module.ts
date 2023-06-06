import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page.component';
import { NgIf } from '@angular/common';
import { HomeModule } from '../../feature/home/home.module';

@NgModule({
  imports: [HomeRoutingModule, NgIf, HomeModule],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomepageModule {}
