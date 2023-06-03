import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgIf } from '@angular/common';
import { HomeModule } from '../../feature/home/home.module';

@NgModule({
  imports: [HomeRoutingModule, NgIf, HomeModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomepageModule {}
