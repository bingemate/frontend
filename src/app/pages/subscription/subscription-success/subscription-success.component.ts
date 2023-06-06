import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-subscription-success',
  templateUrl: './subscription-success.component.html',
  styleUrls: ['./subscription-success.component.less'],
})
export class SubscriptionSuccessComponent {
  readonly animation: AnimationOptions = {
    path: 'assets/animations/payment-success.json',
  };
}
