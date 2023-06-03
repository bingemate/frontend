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
    const profile = action.payload.profile;
    const roles = action.payload.roles;
    ctx.setState({
      user: {
        id: profile.id ?? '',
        username: profile.username ?? '',
        email: profile.email ?? '',
        firstname: profile.firstName ?? '',
        lastname: profile.lastName ?? '',
        createdTimestamp: profile.createdTimestamp ?? 0,
        roles: roles,
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
