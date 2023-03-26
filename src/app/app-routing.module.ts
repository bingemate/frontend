import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export interface Link {
  path: string;
  name: string;
  requiredRoles?: string[];
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
    icon: 'home',
  },
  socialNetwork: {
    path: 'social-network',
    name: 'Réseau social',
    requiredRoles: ['user'],
    icon: 'global',
  },
  subscriptions: {
    path: 'subscriptions',
    name: 'Abonnements',
    requiredRoles: ['user'],
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
    requiredRoles: ['user'],
    icon: 'play-square',
  },
  streaming: {
    path: 'streaming',
    name: 'Streaming',
    requiredRoles: ['user'],
  },
  watchlist: {
    path: 'watchlist',
    name: 'Suivies',
    requiredRoles: ['user'],
    icon: 'unordered-list',
  },
  statistics: {
    path: 'statistics',
    name: 'Statistiques',
    requiredRoles: ['user'],
    icon: 'line-chart',
  },
  settings: {
    path: 'settings',
    name: 'Paramètres',
    requiredRoles: ['user'],
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
    canActivate: [authGuard],
  },
  {
    path: navigationRoot.subscriptions.path,
    loadChildren: () =>
      import('./pages/subscription/subscription.module').then(
        m => m.SubscriptionModule
      ),
    canActivate: [authGuard],
  },
  {
    path: navigationRoot.medias.path,
    loadChildren: () =>
      import('./pages/medias/medias.module').then(m => m.MediasModule),
    canActivate: [authGuard],
  },
  {
    path: navigationRoot.streaming.path,
    loadChildren: () =>
      import('./pages/streaming/streaming.module').then(m => m.StreamingModule),
    canActivate: [authGuard],
  },
  {
    path: navigationRoot.watchlist.path,
    loadChildren: () =>
      import('./pages/watchlist/watchlist.module').then(m => m.WatchlistModule),
    canActivate: [authGuard],
  },
  {
    path: navigationRoot.statistics.path,
    loadChildren: () =>
      import('./pages/statistics/statistics.module').then(
        m => m.StatisticsModule
      ),
    canActivate: [authGuard],
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
