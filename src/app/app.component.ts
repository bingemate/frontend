import { Component, OnInit } from '@angular/core';
import { Link, navigationRoot } from './app-routing.module';
import { accountLinks } from './pages/auth/auth-routing.module';
import { socialNetworkLinks } from './pages/social-network/social-network-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { subscriptionLinks } from './pages/subscription/subscriptions-routing.module';
import { mediasLinks } from './pages/medias/medias-routing.module';
import { watchlistLinks } from './pages/watchlist/watchlist-routing.module';
import { statisticsLinks } from './pages/statistics/statistics-routing.module';
import { NotificationsService } from './core/notifications/notifications.service';
import { Actions, Select, Store } from '@ngxs/store';
import { ThemeAction } from './core/theme/store/theme.actions';
import { ThemeState } from './core/theme/store/theme.state';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthActions } from './core/auth/store/auth.actions';
import { AuthState } from './core/auth/store/auth.state';
import { isMatchingRoles, UserModel } from './shared/models/user.models';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  readonly environment = environment;

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    public readonly notificationsService: NotificationsService,
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly keycloak: KeycloakService
  ) {}

  ngOnInit(): void {
    this.subscribeForRouterEvents();
    this.subscribeForAuthEvents();
    this.subscribeForThemeEvents();
    this.isUserLoggedIn().then();
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
  @Select(AuthState.user)
  user$!: Observable<UserModel>;
  user: UserModel | null = null;

  subscribeForAuthEvents() {
    this.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.user$.subscribe(user => {
      this.user = user;
      this.accountLinks = this._accountLinks();
    });
  }

  async isUserLoggedIn() {
    const logged = await this.keycloak.isLoggedIn();
    if (logged) {
      const profile = await this.keycloak.loadUserProfile();
      const roles = this.keycloak.getUserRoles();
      this.store.dispatch(
        new AuthActions.LoggedIn({
          profile,
          roles,
        })
      );
    }
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

  readonly chatLink = `${navigationRoot.socialNetwork.path}/${socialNetworkLinks.chat.path}`;

  accountLinks: Link[] = [];

  private _accountLinks = () => {
    return Object.values(accountLinks)
      .filter(link =>
        this.isAuthenticated
          ? link.requiredRoles !== undefined &&
            isMatchingRoles(this.user, link.requiredRoles)
          : link.requiredRoles === undefined
      )
      .map(link => {
        return { ...link, path: `${navigationRoot.auth.path}/${link.path}` };
      });
  };

  readonly subscriptionLinks = Object.values(subscriptionLinks)
    .filter(link => !['subscribe'].includes(link.path))
    .map(link => {
      return {
        ...link,
        path: `${navigationRoot.subscriptions.path}/${link.path}`,
      };
    });

  readonly socialNetworkLinks = Object.values(socialNetworkLinks)
    .filter(link => !['media', 'user-profile', 'chat'].includes(link.path))
    .map(link => {
      return {
        ...link,
        path: `${navigationRoot.socialNetwork.path}/${link.path}`,
      };
    });

  readonly mediasLinks = Object.values(mediasLinks)
    .filter(media => !['view'].includes(media.path))
    .map(link => {
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
