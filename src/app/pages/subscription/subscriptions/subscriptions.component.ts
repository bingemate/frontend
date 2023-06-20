import { Component, OnDestroy } from '@angular/core';
import { PaymentService } from '../../../feature/subscription/payment.service';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.less'],
})
export class SubscriptionsComponent implements OnDestroy {
  readonly animation: AnimationOptions = {
    path: 'assets/animations/popcorn.json',
  };
  loading = false;

  subscriptions: Subscription[] = [];

  constructor(private paymentService: PaymentService) {}

  subscribe() {
    this.loading = true;
    this.subscriptions.push(
      this.paymentService.getCheckoutSessionUrl().subscribe({
        next: url => (window.location = url.url as any),
        complete: () => (this.loading = false),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
