import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../feature/subscription/payment.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Observable } from 'rxjs';
import { SubscriptionModel } from '../../../shared/models/streaming.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.less'],
})
export class SubscriptionComponent implements OnInit {
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;
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
    this.paymentService.getCheckoutSession().subscribe({
      next: url => (window.location = url.url as any),
      complete: () => (this.loading = false),
    });
  }
  changePaymentMethod() {
    this.loading = true;
    this.paymentService.changePaymentMethodUrl().subscribe({
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
