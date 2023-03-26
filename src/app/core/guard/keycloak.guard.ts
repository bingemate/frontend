import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class KeycloakGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private readonly notificationsService: NotificationsService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      this.notificationsService.error(
        'Vous devez être connecté pour accéder à ce contenu'
      );
      return false;
      // await this.keycloak.login({
      //   redirectUri: window.location.origin + state.url,
      // });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['requiredRoles'];

    let granted = false;

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      granted = true;
      return granted;
    }

    // Allow the user to proceed if all the required roles are present.
    granted = requiredRoles.every(role => this.roles.includes(role));

    // Routing user into permission denied view if don't have necessary roles.
    if (!granted) {
      // await this.router.navigate(['permission-denied']);
      this.notificationsService.error(
        'Vous devez avoir le rôle administrateur pour accéder à ce contenu'
      );
    }

    return granted;
  }
}
