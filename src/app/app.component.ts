import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import {
  navigationRoot,
  socialNetworkLinks,
  subscriptionLinks,
} from './app-routing.module';
import { accountLinks } from './pages/auth/auth-routing.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  isCollapsed = false;
  royuteName = '';

  accountLinks = Object.values(accountLinks).map(link => {
    return { ...link, path: `${navigationRoot.auth.path}/${link.path}` };
  });
  subscriptionLinks = subscriptionLinks;
  socialNetworkLinks = socialNetworkLinks;

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme().then(() => console.count('theme toggled'));
  }
}
