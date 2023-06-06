import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-subscription-canceled',
  templateUrl: './subscription-canceled.component.html',
  styleUrls: ['./subscription-canceled.component.less'],
})
export class SubscriptionCanceledComponent {
  readonly animation: AnimationOptions = {
    path: 'assets/animations/payment-failed.json',
  };
}
