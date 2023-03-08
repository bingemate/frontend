import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';

@NgModule({
  declarations: [SubscriptionListComponent],
  imports: [CommonModule, SubscriptionsRoutingModule],
})
export class SubscriptionModule {}
