import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../feature/subscription/payment.service';
import { SubscriptionModel } from '../../../shared/models/streaming.model';
import { navigationRoot } from '../../../app-routing.module';
import { subscriptionLinks } from '../subscriptions-routing.module';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.less'],
})
export class SubscriptionComponent implements OnInit {
  readonly subscriptionBillingPath = `/${navigationRoot.subscriptions.path}/${subscriptionLinks.billing.path}/`;
  loading = false;
  subscription?: SubscriptionModel;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.paymentService
      .getSubscription()
      .subscribe(subscription => (this.subscription = subscription));
  }

  subscribe() {
    this.loading = true;
    this.paymentService.getCheckoutSessionUrl().subscribe({
      next: url => (window.location = url.url as any),
      complete: () => (this.loading = false),
    });
  }
  changePaymentMethod() {
    this.loading = true;
    this.paymentService.getChangePaymentMethodUrl().subscribe({
      next: url => (window.location = url.url as any),
      complete: () => (this.loading = false),
    });
  }
  cancelSubscription() {
    this.loading = true;
    this.paymentService
      .cancelSubscription()
      .subscribe({ complete: () => (this.loading = false) });
  }

  getSubscriptionStatus() {
    switch (this.subscription?.status) {
      default:
        return 'Inconnu';
      case 'active':
        return 'Actif';
      case 'canceled':
        return 'Annulé';
    }
  }

  getSubscriptionStatusState() {
    switch (this.subscription?.status) {
      default:
        return 'default';
      case 'active':
        return 'success';
      case 'canceled':
        return 'warning';
      case 'unpaid':
        return 'error';
    }
  }
}
