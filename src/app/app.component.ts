import { Component } from '@angular/core';
import { navigationRoot } from './app-routing.module';
import { accountLinks } from './pages/auth/auth-routing.module';
import { socialNetworkLinks } from './pages/social-network/social-network-routing.module';
import { Router } from '@angular/router';
import { subscriptionLinks } from './pages/subscription/subscriptions-routing.module';
import { mediasLinks } from './pages/medias/medias-routing.module';
import { watchlistLinks } from './pages/watchlist/watchlist-routing.module';
import { statisticsLinks } from './pages/statistics/statistics-routing.module';
import { NotificationsService } from './core/notifications/notifications.service';
import { Store } from '@ngxs/store';
import { ToggleTheme } from './core/theme/store/theme.actions';
import { ThemeState } from './core/theme/store/theme.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  isCollapsed = false;
  currentSection = 'home';
  currentSectionName = 'Accueil';
  isDarkTheme$: Observable<boolean>;
  isDarkTheme = false;

  chatLink = `${navigationRoot.socialNetwork.path}/${socialNetworkLinks.chat.path}`;

  accountLinks = Object.values(accountLinks).map(link => {
    return { ...link, path: `${navigationRoot.auth.path}/${link.path}` };
  });

  subscriptionLinks = Object.values(subscriptionLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.subscriptions.path}/${link.path}`,
    };
  });

  socialNetworkLinks = Object.values(socialNetworkLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.socialNetwork.path}/${link.path}`,
    };
  });

  mediasLinks = Object.values(mediasLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.medias.path}/${link.path}`,
    };
  });

  watchlistLinks = Object.values(watchlistLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.watchlist.path}/${link.path}`,
    };
  });

  statisticsLinks = Object.values(statisticsLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.statistics.path}/${link.path}`,
    };
  });

  constructor(
    private readonly router: Router,
    public readonly notificationsService: NotificationsService,
    public readonly store: Store
  ) {
    router.events.subscribe(() => {
      this.currentSection = router.url.split('/')[1];
      this.currentSectionName =
        Object.values(navigationRoot).find(
          link => link.path === this.currentSection
        )?.name ?? 'Accueil';
    });

    this.isDarkTheme$ = this.store.select(ThemeState.isDarkTheme);
    this.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  toggleTheme() {
    this.store.dispatch(new ToggleTheme());
  }
}
