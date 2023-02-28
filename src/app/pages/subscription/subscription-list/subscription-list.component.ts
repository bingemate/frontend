import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.less'],
})
export class SubscriptionListComponent {
  currentRoute = '';

  constructor(router: Router) {
    this.currentRoute = router.url;
  }
}
