import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';

export const subscriptionLinks: NavigationLinks<
  'subscriptions' | 'subscribe' | 'my_subscription' | 'billing'
> = {
  subscriptions: {
    path: 'subscriptions-list',
    name: 'Abonnements',
  },
  subscribe: {
    path: 'subscribe',
    name: 'Souscription',
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
    component: SubscriptionListComponent,
    data: { title: subscriptionLinks.subscriptions.name },
  },
  {
    path: subscriptionLinks.subscribe.path,
    component: SubscriptionListComponent,
    data: { title: subscriptionLinks.subscribe.name },
  },
  {
    path: subscriptionLinks.my_subscription.path,
    component: SubscriptionListComponent,
    data: { title: subscriptionLinks.my_subscription.name },
  },
  {
    path: subscriptionLinks.billing.path,
    component: SubscriptionListComponent,
    data: { title: subscriptionLinks.billing.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
