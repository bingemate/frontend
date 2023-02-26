import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export interface Link {
  path: string;
  name: string;
  auth?: boolean;
  admin?: boolean;
  icon?: string;
}

export type NavigationLinks<T extends string> = {
  [key in T]: Link;
};

export const accountLinks: NavigationLinks<'login' | 'register' | 'my_account' | 'logout'> = {
  login: {
    path: '/login',
    name: 'Connexion / Inscription',
    // icon: 'login',
  },
  register: {
    path: '/register',
    name: 'Inscription',
    // icon: 'user',
  },
  my_account: {
    path: '/my-account',
    name: 'Mon compte',
    auth: true,
    // icon: 'user',
  },
  logout: {
    path: '/logout',
    name: 'Déconnexion',
    auth: true,
    // icon: 'logout',
  },
};

export const subscriptionLinks: NavigationLinks<
  'subscriptions' | 'subscribe' | 'my_subscription' | 'billing'
> = {
  subscriptions: {
    path: '/subscriptions',
    name: 'Abonnements',
    auth: true,
  },
  subscribe: {
    path: '/subscribe',
    name: 'Souscription',
    auth: true,
  },
  my_subscription: {
    path: '/my-subscription',
    name: 'Mon abonnement',
    auth: true,
  },
  billing: {
    path: '/billing',
    name: 'Facturation',
    auth: true,
  },
};

export const socialNetworkLinks: NavigationLinks<
  | 'social_network'
  | 'search_media'
  | 'search_user'
  | 'media'
  | 'user_profile'
  | 'chat'
  | 'relations'
  | 'trending'
> = {
  social_network: {
    path: '/social-network',
    name: 'Réseau social',
    auth: true,
  },
  search_media: {
    path: '/social-network/search-media',
    name: 'Recherche média',
    auth: true,
  },
  search_user: {
    path: '/social-network/search-user',
    name: 'Recherche utilisateur',
    auth: true,
  },
  media: {
    path: '/social-network/media',
    name: 'Média',
    auth: true,
  },
  user_profile: {
    path: '/social-network/user-profile',
    name: 'Profil utilisateur',
  },
  chat: {
    path: '/social-network/chat',
    name: 'Chat',
    auth: true,
  },
  relations: {
    path: '/social-network/relations',
    name: 'Relations',
    auth: true,
  },
  trending: {
    path: '/social-network/trending',
    name: 'Tendances',
    auth: true,
  },
};

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
