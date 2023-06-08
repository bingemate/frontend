import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from '../../../shared/models/auth.models';
import { Injectable } from '@angular/core';
import { AuthActions } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return state.user !== null;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static isAdmin(state: AuthStateModel) {
    return !!state.user && state.user.roles.includes('bingemate-admin');
  }

  @Selector()
  static isSubscribed(state: AuthStateModel) {
    return !!state.user && state.user.roles.includes('bingemate-subscribed');
  }

  @Action(AuthActions.LoggedIn)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.LoggedIn) {
    ctx.setState({
      user: {
        id: action.payload.user.id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        firstname: action.payload.user.firstname,
        lastname: action.payload.user.lastname,
        createdTimestamp: action.payload.user.createdTimestamp,
        roles: action.payload.user.roles,
      },
    });
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: null,
    });
  }
}
