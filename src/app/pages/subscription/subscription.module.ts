import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { PaymentModule } from '../../feature/subscription/payment.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { SharedModule } from '../../shared/shared.module';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';
import { SubscriptionCanceledComponent } from './subscription-canceled/subscription-canceled.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { LottieComponent } from 'ngx-lottie';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [
    SubscriptionComponent,
    InvoicesComponent,
    SubscriptionSuccessComponent,
    SubscriptionCanceledComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    NzButtonModule,
    NzIconModule,
    NzWaveModule,
    PaymentModule,
    NzListModule,
    NzDropDownModule,
    NzImageModule,
    NzInputNumberModule,
    NzMenuModule,
    NzSpaceModule,
    SharedModule,
    NzTimelineModule,
    NzToolTipModule,
    LottieComponent,
    NzGridModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzPopconfirmModule,
  ],
})
export class SubscriptionModule {}
