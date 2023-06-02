import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.less'],
})
export class MessagingComponent {
  currentRoute = '';

  constructor(router: Router) {
    this.currentRoute = router.url;
  }
}
