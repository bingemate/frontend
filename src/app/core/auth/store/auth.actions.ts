import { KeycloakProfile } from 'keycloak-js';

export namespace AuthActions {
  export class LoggedIn {
    static readonly type = '[Auth] Logged In';

    constructor(
      public payload: {
        profile: KeycloakProfile;
        roles: string[];
      }
    ) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }
}
