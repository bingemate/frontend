import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { navigationRoot } from '../../../app-routing.module';
import { subscriptionLinks } from '../subscriptions-routing.module';

@Component({
  selector: 'app-subscription-success',
  templateUrl: './subscription-success.component.html',
  styleUrls: ['./subscription-success.component.less'],
})
export class SubscriptionSuccessComponent {
  readonly subscriptionBillingPath = `/${navigationRoot.subscriptions.path}/${subscriptionLinks.billing.path}/`;
  readonly animation: AnimationOptions = {
    path: 'assets/animations/payment-success.json',
  };
}
