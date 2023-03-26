import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../../core/auth/store/auth.actions';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-auth-login-register',
  templateUrl: './auth-login-register.component.html',
  styleUrls: ['./auth-login-register.component.less'],
})
export class AuthLoginRegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private readonly store: Store,
    private keycloak: KeycloakService
  ) {}

  ngOnInit(): void {
    this.login();
  }

  login() {
    this.keycloak
      .login({
        redirectUri: window.location.origin,
      })
      .then();
  }
}
