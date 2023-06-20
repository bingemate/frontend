import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaymentService } from '../payment.service';
import { UserResponse } from '../../../shared/models/user.models';
import { mergeMap } from 'rxjs';
import { SubscriptionModel } from '../../../shared/models/streaming.model';
import { NotificationsService } from '../../../core/notifications/notifications.service';

@Component({
  selector: 'app-subscription-admin',
  templateUrl: './subscription-admin.component.html',
  styleUrls: ['./subscription-admin.component.less'],
})
export class SubscriptionAdminComponent implements OnChanges {
  @Input()
  user: UserResponse | undefined;
  @Output()
  closeModal = new EventEmitter();
  subscription?: SubscriptionModel;
  endDate?: Date;

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
    this.paymentService.getSubscriptionDetails(user.id).subscribe(
      subscription => (this.subscription = subscription),
      () => (this.subscription = undefined)
    );
    this.paymentService.getCustomer(user.id).subscribe({
      error: () => {
        this.notificationsService.info(
          'Gestion impossible',
          "L'utilisateur n'est pas rattaché à un moyen de paiement"
        );
        this.closeModal.emit();
      },
    });
  }
  canGetDate(current: Date) {
    return current.getTime() < new Date().getTime();
  }

  cancelSubscription() {
    this.paymentService
      .cancelSubscription(this.user!.id)
      .subscribe(() => (this.subscription = undefined));
  }

  createSubscription() {
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
      .subscribe(sub => (this.subscription = sub));
  }
}
