import { APP_INITIALIZER, Provider } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { Store } from '@ngxs/store';
import { ThemeAction } from './theme/store/theme.actions';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

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
  const { auth } = environment;
  return () =>
    keycloak.init({
      config: {
        url: auth.url,
        realm: auth.realm,
        clientId: auth.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      loadUserProfileAtStartUp: true,
      shouldAddToken: request => {
        const url = request.url;

        return url.includes(environment.apiUrl) && !url.includes('/public');
      },
    });
}
