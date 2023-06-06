import { Component } from '@angular/core';
import { PaymentService } from '../../../feature/subscription/payment.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.less'],
})
export class SubscriptionComponent {
  constructor(private paymentService: PaymentService) {}

  subscribe() {
    this.paymentService
      .getCheckoutSession()
      .subscribe(url => (window.location = url.url as any));
  }
  changePaymentMethod() {
    this.paymentService
      .changePaymentMethodUrl()
      .subscribe(url => (window.location = url.url as any));
  }
  cancelSubscription() {
    this.paymentService.cancelSubscription().subscribe();
  }
}
