import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { accountLinks, socialNetworkLinks, subscriptionLinks } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  isCollapsed = false;



  
  accountLinks = Object.values(accountLinks);
  subscriptionLinks = subscriptionLinks;
  socialNetworkLinks = socialNetworkLinks;

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme().then(() => console.count('theme toggled'));
  }
}
