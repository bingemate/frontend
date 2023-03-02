import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/store/auth.state';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  return store.selectSnapshot(AuthState.isAuthenticated);
};

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  return authGuard(route, state) && store.selectSnapshot(AuthState.isAdmin);
};
