import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { navigationRoot, subscriptionLinks } from './app-routing.module';
import { accountLinks } from './pages/auth/auth-routing.module';
import { socialNetworkLinks } from './pages/social-network/social-network-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  isCollapsed = false;
  currentSection = 'home';
  currentSectionName = 'Accueil';

  accountLinks = Object.values(accountLinks).map(link => {
    return { ...link, path: `${navigationRoot.auth.path}/${link.path}` };
  });
  subscriptionLinks = subscriptionLinks;
  socialNetworkLinks = Object.values(socialNetworkLinks).map(link => {
    return {
      ...link,
      path: `${navigationRoot.socialNetwork.path}/${link.path}`,
    };
  });

  constructor(private themeService: ThemeService, router: Router) {
    router.events.subscribe(() => {
      this.currentSection = router.url.split('/')[1];
      this.currentSectionName =
        Object.values(navigationRoot).find(
          link => link.path === this.currentSection
        )?.name ?? 'Accueil';
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme().then(() => console.count('theme toggled'));
  }
}
