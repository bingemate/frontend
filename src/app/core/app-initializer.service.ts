import { APP_INITIALIZER } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { Store } from '@ngxs/store';
import { ThemeAction } from './theme/store/theme.actions';
import { AuthState } from './auth/store/auth.state';
import { AuthActions } from './auth/store/auth.actions';

export const AppInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: (store: Store) => () => {
    store.dispatch(new ThemeAction.Init());
    const isAuth = store.selectSnapshot(AuthState.isAuthenticated);
    if (isAuth) {
      store.dispatch(new AuthActions.GetMe());
    }
  },
  deps: [Store, ThemeService],
  multi: true,
};
