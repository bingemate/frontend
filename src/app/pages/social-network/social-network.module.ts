import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialNetworkRoutingModule } from './social-network-routing.module';
import { SocialNetworkHomeComponent } from './social-network-home/social-network-home.component';

@NgModule({
  declarations: [SocialNetworkHomeComponent],
  imports: [CommonModule, SocialNetworkRoutingModule],
})
export class SocialNetworkModule {}
