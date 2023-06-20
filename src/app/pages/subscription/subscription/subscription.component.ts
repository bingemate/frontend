import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../../../feature/subscription/payment.service';
import { SubscriptionModel } from '../../../shared/models/streaming.model';
import { navigationRoot } from '../../../app-routing.module';
import { subscriptionLinks } from '../subscriptions-routing.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.less'],
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  isOnPhone = false;

  readonly subscriptionBillingPath = `/${navigationRoot.subscriptions.path}/${subscriptionLinks.billing.path}/`;
  loading = false;
  subscription?: SubscriptionModel;
  subscriptionLoading = false;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.subscriptionLoading = true;
    this.subscriptions.push(
      this.paymentService.getSubscription().subscribe(subscription => {
        this.subscriptionLoading = false;
        this.subscription = subscription;
      })
    );
  }

  subscribe() {
    this.loading = true;
    this.subscriptions.push(
      this.paymentService.getCheckoutSessionUrl().subscribe({
        next: url => (window.location = url.url as any),
        complete: () => (this.loading = false),
      })
    );
  }
  changePaymentMethod() {
    this.loading = true;
    this.subscriptions.push(
      this.paymentService.getChangePaymentMethodUrl().subscribe({
        next: url => (window.location = url.url as any),
        complete: () => (this.loading = false),
      })
    );
  }
  cancelSubscription() {
    this.loading = true;
    this.subscriptions.push(
      this.paymentService
        .stopSubscription()
        .subscribe({ complete: () => (this.loading = false) })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
