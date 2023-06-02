import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { KeycloakGuard } from './core/guard/keycloak.guard';

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
  | 'admin'
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
    requiredRoles: [],
    icon: 'global',
  },
  subscriptions: {
    path: 'subscriptions',
    name: 'Abonnements',
    requiredRoles: [],
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
    requiredRoles: [],
    icon: 'play-square',
  },
  streaming: {
    path: 'streaming',
    name: 'Streaming',
    requiredRoles: [],
  },
  watchlist: {
    path: 'watchlist',
    name: 'Suivies',
    requiredRoles: [],
    icon: 'unordered-list',
  },
  statistics: {
    path: 'statistics',
    name: 'Statistiques',
    requiredRoles: [],
    icon: 'line-chart',
  },
  admin: {
    path: 'admin',
    name: 'Admin',
    requiredRoles: ['bingemate-admin'],
    icon: 'coffee',
  },
  settings: {
    path: 'settings',
    name: 'Paramètres',
    requiredRoles: [],
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
    canActivate: [KeycloakGuard],
    data: {
      requiredRoles: navigationRoot.socialNetwork.requiredRoles,
    },
  },
  {
    path: navigationRoot.subscriptions.path,
    loadChildren: () =>
      import('./pages/subscription/subscription.module').then(
        m => m.SubscriptionModule
      ),
    canActivate: [KeycloakGuard],
    data: {
      requiredRoles: navigationRoot.subscriptions.requiredRoles,
    },
  },
  {
    path: navigationRoot.medias.path,
    loadChildren: () =>
      import('./pages/medias/medias.module').then(m => m.MediasModule),
    canActivate: [KeycloakGuard],
    data: {
      requiredRoles: navigationRoot.medias.requiredRoles,
    },
  },
  {
    path: navigationRoot.streaming.path,
    loadChildren: () =>
      import('./pages/streaming/streaming.module').then(m => m.StreamingModule),
    canActivate: [KeycloakGuard],
    data: {
      requiredRoles: navigationRoot.streaming.requiredRoles,
    },
  },
  {
    path: navigationRoot.watchlist.path,
    loadChildren: () =>
      import('./pages/watchlist/watchlist.module').then(m => m.WatchlistModule),
    canActivate: [KeycloakGuard],
    data: {
      requiredRoles: navigationRoot.watchlist.requiredRoles,
    },
  },
  {
    path: navigationRoot.statistics.path,
    loadChildren: () =>
      import('./pages/statistics/statistics.module').then(
        m => m.StatisticsModule
      ),
    canActivate: [KeycloakGuard],
    data: {
      requiredRoles: navigationRoot.statistics.requiredRoles,
    },
  },
  {
    path: navigationRoot.admin.path,
    loadChildren: () =>
      import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [KeycloakGuard],
    data: {
      requiredRoles: navigationRoot.admin.requiredRoles,
    },
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
