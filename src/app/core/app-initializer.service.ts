import { APP_INITIALIZER, Provider } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { Store } from '@ngxs/store';
import { ThemeAction } from './theme/store/theme.actions';
import { AuthState } from './auth/store/auth.state';
import { AuthActions } from './auth/store/auth.actions';
import { KeycloakService } from 'keycloak-angular';

export const AppInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (store: Store, keycloakService: KeycloakService) => () => {
    initializeKeycloak(keycloakService);
    store.dispatch(new ThemeAction.Init());
    const isAuth = store.selectSnapshot(AuthState.isAuthenticated);
    if (isAuth) {
      store.dispatch(new AuthActions.GetMe());
    }
  },
  deps: [Store, ThemeService, KeycloakService],
  multi: true,
};

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'bingemate',
        clientId: 'angular-frontend',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      loadUserProfileAtStartUp: true,
    });
}
