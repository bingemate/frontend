import { UserResponse } from '../../../shared/models/user.models';

export namespace AuthActions {
  export class LoggedIn {
    static readonly type = '[Auth] Logged In';

    constructor(
      public payload: {
        user: UserResponse;
      }
    ) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }
}
