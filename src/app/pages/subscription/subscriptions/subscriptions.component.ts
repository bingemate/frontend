import { Component } from '@angular/core';
import { PaymentService } from '../../../feature/subscription/payment.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.less'],
})
export class SubscriptionsComponent {
  readonly animation: AnimationOptions = {
    path: 'assets/animations/popcorn.json',
  };
  loading = false;

  constructor(private paymentService: PaymentService) {}

  subscribe() {
    this.loading = true;
    this.paymentService.getCheckoutSession().subscribe({
      next: url => (window.location = url.url as any),
      complete: () => (this.loading = false),
    });
  }
}
