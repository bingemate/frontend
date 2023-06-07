import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { navigationRoot } from '../../../app-routing.module';
import { subscriptionLinks } from '../subscriptions-routing.module';

@Component({
  selector: 'app-subscription-canceled',
  templateUrl: './subscription-canceled.component.html',
  styleUrls: ['./subscription-canceled.component.less'],
})
export class SubscriptionCanceledComponent {
  readonly subscriptionListPath = `/${navigationRoot.subscriptions.path}/${subscriptionLinks.subscriptions.path}/`;
  readonly animation: AnimationOptions = {
    path: 'assets/animations/payment-failed.json',
  };
}
