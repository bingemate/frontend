import { NgModule } from '@angular/core';
import { PaymentService } from './payment.service';
import { SubscriptionAdminComponent } from './subscription-admin/subscription-admin.component';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [SubscriptionAdminComponent],
  imports: [
    NgIf,
    NzButtonModule,
    NzPopconfirmModule,
    NzWaveModule,
    NzDatePickerModule,
    FormsModule,
    NzSpinModule,
    DatePipe,
    AsyncPipe,
    NzBadgeModule,
    NzIconModule,
    NzTagModule,
    NzToolTipModule,
  ],
  exports: [SubscriptionAdminComponent],
  providers: [PaymentService],
})
export class PaymentModule {}
