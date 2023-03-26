import { KeycloakProfile } from 'keycloak-js';

export namespace AuthActions {
  export class Login {
    static readonly type = '[Auth] Login';
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

  export class LogoutSuccess {
    static readonly type = '[Auth] Logout Success';
  }

  export class LogoutFailure {
    static readonly type = '[Auth] Logout Failure';
  }

  /*  export class GetMe {
    static readonly type = '[Auth] Get Me';
  }*/
}
