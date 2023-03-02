import { Component, OnInit } from '@angular/core';
import { navigationRoot } from './app-routing.module';
import { accountLinks } from './pages/auth/auth-routing.module';
import { socialNetworkLinks } from './pages/social-network/social-network-routing.module';
import { Router } from '@angular/router';
import { subscriptionLinks } from './pages/subscription/subscriptions-routing.module';
import { mediasLinks } from './pages/medias/medias-routing.module';
import { watchlistLinks } from './pages/watchlist/watchlist-routing.module';
import { statisticsLinks } from './pages/statistics/statistics-routing.module';
import { NotificationsService } from './core/notifications/notifications.service';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { ThemeAction } from './core/theme/store/theme.actions';
import { ThemeState } from './core/theme/store/theme.state';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthActions } from './core/auth/store/auth.actions';
import { AuthState } from './core/auth/store/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  readonly environment = environment;

  constructor(
    private readonly router: Router,
    public readonly notificationsService: NotificationsService,
    private readonly store: Store,
    private readonly actions: Actions
  ) {
    this.subscribeForRouterEvents();
    this.subscribeForAuthEvents();
  }

  ngOnInit(): void {
    this.subscribeForThemeEvents();
    this.subscribeForActionsNavigation();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Auth
  ////////////////////////////////////////////////////////////////////////////

  @Select(AuthState.isAuthenticated)
  isAuthenticated$!: Observable<boolean>;
  isAuthenticated = false;
  @Select(AuthState.isAdmin)
  isAdmin$!: Observable<boolean>;
  isAdmin = false;

  subscribeForAuthEvents() {
    this.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Theme
  //////////////////////////////////////////////////////////////////////////////

  @Select(ThemeState.isDarkTheme)
  isDarkTheme$!: Observable<boolean>;
  isDarkTheme = false;

  toggleTheme() {
    this.store.dispatch(new ThemeAction.Toggle());
  }

  subscribeForThemeEvents() {
    this.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Navigation
  //////////////////////////////////////////////////////////////////////////////

  isNavbarCollapsed = false;
  currentSection = 'home';
  currentSectionName = 'Accueil';
  readonly navigationRoot = navigationRoot;

  subscribeForRouterEvents() {
    this.router.events.subscribe(() => {
      this.currentSection = this.router.url.split('/')[1];
      this.currentSectionName =
        Object.values(navigationRoot).find(
          link => link.path === this.currentSection
        )?.name ?? 'Accueil';
    });
  }

  subscribeForActionsNavigation() {
    this.actions.pipe(ofActionSuccessful(AuthActions.Logout)).subscribe(() => {
      this.router.navigate(['/']).then();
    });
    this.actions.pipe(ofActionSuccessful(AuthActions.Login)).subscribe(() => {
      this.router.navigate(['/']).then();
    });
  }

  readonly chatLink = `${navigationRoot.socialNetwork.path}/${socialNetworkLinks.chat.path}`;

  readonly accountLinks = Object.values(accountLinks).map(link => {
    return { ...link, path: `${navigationRoot.auth.path}/${link.path}` };
  });

  readonly subscriptionLinks = Object.values(subscriptionLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.subscriptions.path}/${link.path}`,
    };
  });

  readonly socialNetworkLinks = Object.values(socialNetworkLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.socialNetwork.path}/${link.path}`,
    };
  });

  readonly mediasLinks = Object.values(mediasLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.medias.path}/${link.path}`,
    };
  });

  readonly watchlistLinks = Object.values(watchlistLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.watchlist.path}/${link.path}`,
    };
  });

  readonly statisticsLinks = Object.values(statisticsLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.statistics.path}/${link.path}`,
    };
  });
}
