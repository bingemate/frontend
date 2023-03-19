import { NgModule } from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { Role } from './shared/models/user.models';
import { authGuard } from './core/guard/auth.guard';

export interface Link {
  path: string;
  name: string;
  requiredRole?: Role;
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
    requiredRole: 'user',
    icon: 'global',
  },
  subscriptions: {
    path: 'subscriptions',
    name: 'Abonnements',
    requiredRole: 'user',
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
    requiredRole: 'user',
    icon: 'play-square',
  },
  streaming: {
    path: 'streaming',
    name: 'Streaming',
    requiredRole: 'user',
  },
  watchlist: {
    path: 'watchlist',
    name: 'Suivies',
    requiredRole: 'user',
    icon: 'unordered-list',
  },
  statistics: {
    path: 'statistics',
    name: 'Statistiques',
    requiredRole: 'user',
    icon: 'line-chart',
  },
  settings: {
    path: 'settings',
    name: 'Paramètres',
    requiredRole: 'user',
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
      preloadingStrategy: NoPreloading,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
