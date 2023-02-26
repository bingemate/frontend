import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  isCollapsed = false;

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme().then(() => console.count('theme toggled'));
  }
}
