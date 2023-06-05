import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { InvoicesComponent } from './invoices/invoices.component';

export const subscriptionLinks: NavigationLinks<
  'subscriptions' | 'my_subscription' | 'billing'
> = {
  subscriptions: {
    path: 'subscriptions-list',
    name: 'Abonnements',
  },
  my_subscription: {
    path: 'my-subscription',
    name: 'Mon abonnement',
  },
  billing: {
    path: 'billing',
    name: 'Facturation',
  },
};

const routes: Routes = [
  {
    path: subscriptionLinks.subscriptions.path,
    component: SubscriptionComponent,
    data: { title: subscriptionLinks.subscriptions.name },
  },
  {
    path: subscriptionLinks.my_subscription.path,
    component: SubscriptionComponent,
    data: { title: subscriptionLinks.my_subscription.name },
  },
  {
    path: subscriptionLinks.billing.path,
    component: InvoicesComponent,
    data: { title: subscriptionLinks.billing.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
