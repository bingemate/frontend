import { Component, OnDestroy, OnInit } from '@angular/core';
import { Link, navigationRoot } from './app-routing.module';
import { accountLinks } from './pages/auth/auth-routing.module';
import { socialNetworkLinks } from './pages/social-network/social-network-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { subscriptionLinks } from './pages/subscription/subscriptions-routing.module';
import {
  mediaSearchPath,
  mediasLinks,
} from './pages/medias/medias-routing.module';
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
import { isMatchingRoles, UserResponse } from './shared/models/user.models';
import { KeycloakService } from 'keycloak-angular';
import { adminLinks, uploadLink } from './pages/admin/admin-routing.module';
import { UserService } from './feature/user/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MessagingService } from './feature/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly environment = environment;
  isOnPhone = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private route: ActivatedRoute,
    public readonly notificationsService: NotificationsService,
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly keycloak: KeycloakService,
    private readonly userService: UserService,
    private readonly messagingService: MessagingService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });

    this.isSubscribed$.subscribe(isSubscribed => {
      this.subscriptionLinks = Object.values(subscriptionLinks)
        .filter(
          link =>
            ![
              isSubscribed ? 'subscriptions-list' : 'my-subscription',
              'success',
              'canceled',
            ].includes(link.path)
        )
        .map(link => {
          return {
            ...link,
            path: `${navigationRoot.subscriptions.path}/${link.path}`,
          };
        });
    });
  }

  ngOnInit(): void {
    this.subscribeForRouterEvents();
    this.subscribeForAuthEvents();
    this.subscribeForThemeEvents();
    this.isUserLoggedIn();
  }

  ngOnDestroy() {
    this.messagingService.closeSocket();
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
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;
  isSubscribed = false;
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  subscribeForAuthEvents() {
    this.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.isSubscribed$.subscribe(isSubscribed => {
      this.isSubscribed = isSubscribed;
    });
    this.user$.subscribe(user => {
      this.user = user;
      this.accountLinks = this._accountLinks();
    });
  }

  isUserLoggedIn() {
    this.keycloak
      .isLoggedIn()
      .then(logged => {
        if (logged) {
          this.userService.getMe().subscribe({
            next: user => {
              this.store.dispatch(
                new AuthActions.LoggedIn({
                  user,
                })
              );
              this.messagingService.startMessagingSocket();
            },
            error: () => {
              this.notificationsService.error(
                'Une erreur est survenue lors de la connexion'
              );
            },
          });
        }
      })
      .catch(() => {
        this.notificationsService.error(
          'Une erreur est survenue lors de la connexion'
        );
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

  readonly chatLink = `${navigationRoot.socialNetwork.path}/${socialNetworkLinks.chat.path}`;
  readonly calendarLink = `${navigationRoot.watchlist.path}/${watchlistLinks.calendar.path}`;

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

  subscriptionLinks = Object.values(subscriptionLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.subscriptions.path}/${link.path}`,
    };
  });

  readonly socialNetworkLinks = Object.values(socialNetworkLinks)
    .filter(link => !['user-profile'].includes(link.path))
    .map(link => {
      return {
        ...link,
        path: `${navigationRoot.socialNetwork.path}/${link.path}`,
      };
    });

  readonly mediasLinks = Object.values(mediasLinks)
    .filter(
      media =>
        ![
          'view',
          'movie-view',
          'movies-by-genre',
          'movies-by-actor',
          'movies-by-studio',
          'tv-show-view',
          'tv-shows-by-genre',
          'tv-shows-by-actor',
          'tv-shows-by-network',
        ].includes(media.path)
    )
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

  readonly adminLinks = Object.values(adminLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.admin.path}/${link.path}`,
    };
  });

  onLinkClick() {
    if (this.isOnPhone) {
      this.isNavbarCollapsed = true;
    }
  }

  protected readonly uploadLink = uploadLink;
  protected readonly mediaSearchPath = mediaSearchPath;
}
