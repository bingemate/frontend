import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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

export const navigationRoot: NavigationLinks<
  | 'home'
  | 'socialNetwork'
  | 'subscriptions'
  | 'auth'
  | 'medias'
  | 'streaming'
  | 'watchlist'
  | 'statistics'
  | 'settings'
> = {
  home: {
    path: 'home',
    name: 'Accueil',
    auth: false,
    icon: 'home',
  },
  socialNetwork: {
    path: 'social-network',
    name: 'Réseau social',
    auth: true,
    icon: 'global',
  },
  subscriptions: {
    path: 'subscriptions',
    name: 'Abonnements',
    auth: true,
    icon: 'barcode',
  },
  auth: {
    path: 'auth',
    name: 'Authentification',
    icon: 'user',
  },
  medias: {
    path: 'medias',
    name: 'Médias',
    auth: true,
    icon: 'play-square',
  },
  streaming: {
    path: 'streaming',
    name: 'Streaming',
    auth: true,
  },
  watchlist: {
    path: 'watchlist',
    name: 'Suivies',
    auth: true,
    icon: 'unordered-list',
  },
  statistics: {
    path: 'statistics',
    name: 'Statistiques',
    auth: true,
    icon: 'line-chart',
  },
  settings: {
    path: 'settings',
    name: 'Paramètres',
    auth: false,
    icon: 'setting',
  },
};

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: navigationRoot.home.path },
  {
    path: navigationRoot.home.path,
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: navigationRoot.auth.path,
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: navigationRoot.socialNetwork.path,
    loadChildren: () =>
      import('./pages/social-network/social-network.module').then(
        m => m.SocialNetworkModule
      ),
  },
  {
    path: navigationRoot.subscriptions.path,
    loadChildren: () =>
      import('./pages/subscription/subscription.module').then(
        m => m.SubscriptionModule
      ),
  },
  {
    path: navigationRoot.medias.path,
    loadChildren: () =>
      import('./pages/medias/medias.module').then(m => m.MediasModule),
  },
  {
    path: navigationRoot.streaming.path,
    loadChildren: () =>
      import('./pages/streaming/streaming.module').then(m => m.StreamingModule),
  },
  {
    path: navigationRoot.watchlist.path,
    loadChildren: () =>
      import('./pages/watchlist/watchlist.module').then(m => m.WatchlistModule),
  },
  {
    path: navigationRoot.statistics.path,
    loadChildren: () =>
      import('./pages/statistics/statistics.module').then(
        m => m.StatisticsModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
