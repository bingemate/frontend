import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';
import { SubscriptionCanceledComponent } from './subscription-canceled/subscription-canceled.component';

export const subscriptionLinks: NavigationLinks<
  'subscriptions' | 'my_subscription' | 'billing' | 'success' | 'canceled'
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
  success: {
    path: 'success',
    name: 'Souscription réussie',
  },
  canceled: {
    path: 'canceled',
    name: 'Souscription annuler',
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
  {
    path: subscriptionLinks.success.path,
    component: SubscriptionSuccessComponent,
    data: { title: subscriptionLinks.success.name },
  },
  {
    path: subscriptionLinks.canceled.path,
    component: SubscriptionCanceledComponent,
    data: { title: subscriptionLinks.canceled.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
