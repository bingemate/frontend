import { APP_INITIALIZER, Provider } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { Store } from '@ngxs/store';
import { ThemeAction } from './theme/store/theme.actions';
import { KeycloakService } from 'keycloak-angular';

export const AppInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (store: Store) => () => {
    store.dispatch(new ThemeAction.Init());
  },
  deps: [Store, ThemeService],
  multi: true,
};

export const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService],
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
