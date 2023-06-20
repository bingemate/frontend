import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaymentService } from '../payment.service';
import { UserResponse } from '../../../shared/models/user.models';
import { mergeMap, Subscription } from 'rxjs';
import { SubscriptionModel } from '../../../shared/models/streaming.model';
import { NotificationsService } from '../../../core/notifications/notifications.service';

@Component({
  selector: 'app-subscription-admin',
  templateUrl: './subscription-admin.component.html',
  styleUrls: ['./subscription-admin.component.less'],
})
export class SubscriptionAdminComponent implements OnChanges, OnDestroy {
  @Input()
  user: UserResponse | undefined;
  @Output()
  closeEvent = new EventEmitter();
  subscription?: SubscriptionModel;
  endDate?: Date;

  subscriptions: Subscription[] = [];

  constructor(
    private paymentService: PaymentService,
    private notificationsService: NotificationsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.user &&
      changes['user'].currentValue !== changes['user'].previousValue
    ) {
      this.getCustomer(this.user);
      this.subscription = undefined;
    }
  }

  getCustomer(user: UserResponse) {
    this.subscriptions.push(
      this.paymentService.getSubscriptionDetails(user.id).subscribe({
        next: subscription => (this.subscription = subscription),
        error: () => (this.subscription = undefined),
      })
    );
    this.subscriptions.push(
      this.paymentService.getCustomer(user.id).subscribe({
        error: () => {
          this.notificationsService.info(
            'Gestion impossible',
            "L'utilisateur n'est pas rattaché à un moyen de paiement"
          );
          this.closeEvent.emit();
        },
      })
    );
  }
  canGetDate(current: Date) {
    return current.getTime() < new Date().getTime();
  }

  cancelSubscription() {
    this.subscriptions.push(
      this.paymentService
        .cancelSubscription(this.user!.id)
        .subscribe(() => (this.subscription = undefined))
    );
  }

  createSubscription() {
    this.subscriptions.push(
      this.paymentService
        .createSubscription({
          cancelAt: this.endDate ? this.endDate.getTime() / 1000 : undefined,
          userId: this.user!.id,
        })
        .pipe(
          mergeMap(() =>
            this.paymentService.getSubscriptionDetails(this.user!.id)
          )
        )
        .subscribe(sub => (this.subscription = sub))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
