import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/store/auth.state';
import { NotificationsService } from '../notifications/notifications.service';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const notificationService = inject(NotificationsService);
  const authorized = store.selectSnapshot(AuthState.isAuthenticated);
  if (!authorized) {
    notificationService.error(
      'Vous devez être connecté pour accéder à ce contenu'
    );
  }
  return authorized;
};

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const notificationService = inject(NotificationsService);
  const authorized =
    authGuard(route, state) && store.selectSnapshot(AuthState.isAdmin);
  if (!authorized) {
    notificationService.error(
      'Vous devez avoir le rôle administrateur pour accéder à ce contenu'
    );
  }
  return authorized;
};
