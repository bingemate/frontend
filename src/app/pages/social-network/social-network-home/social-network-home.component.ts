import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-network-home',
  templateUrl: './social-network-home.component.html',
  styleUrls: ['./social-network-home.component.less'],
})
export class SocialNetworkHomeComponent {
  currentRoute = '';

  constructor(router: Router) {
    this.currentRoute = router.url;
  }
}
