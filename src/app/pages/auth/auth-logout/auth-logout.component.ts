import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../../core/auth/store/auth.actions';
import { KeycloakService } from 'keycloak-angular';
import { MessagingService } from '../../../feature/messaging/messaging.service';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.less'],
})
export class AuthLogoutComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly keycloak: KeycloakService,
    private readonly messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.Logout());
    this.keycloak.logout(window.location.origin).then();
    this.messagingService.closeSocket();
  }
}
