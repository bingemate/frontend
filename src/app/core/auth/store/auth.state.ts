import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from '../../../shared/models/auth.models';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { NotificationsService } from '../../notifications/notifications.service';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
  },
})
@Injectable()
export class AuthState {
  /*  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }*/

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
    return !!state.user && state.user.roles.includes('admin');
  }

  constructor(
    private readonly authService: AuthService,
    private notificationService: NotificationsService
  ) {}

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    const profile = action.payload.profile;
    const roles = action.payload.roles;
    ctx.setState({
      user: {
        id: profile.id!,
        username: profile.username!,
        email: profile.email!,
        firstname: profile.firstName!,
        lastname: profile.lastName!,
        roles: roles,
      },
    });
  }

  /*  @Action(AuthActions.LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>) {
    this.notificationService.success('Vous êtes connecté');
    return ctx.dispatch(new AuthActions.GetMe());
  }

  @Action(AuthActions.LoginFailure)
  loginError() {
    this.notificationService.error('Erreur de connexion');
  }*/

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.patchState({
          user: null,
        });
      }),
      mergeMap(() => {
        return ctx.dispatch(new AuthActions.LogoutSuccess());
      }),
      catchError(error => {
        console.error(error);
        return ctx.dispatch(new AuthActions.LogoutFailure());
      })
    );
  }

  @Action(AuthActions.LogoutSuccess)
  logoutSuccess() {
    this.notificationService.info('Vous êtes déconnecté');
  }

  @Action(AuthActions.LogoutFailure)
  logoutError() {
    this.notificationService.error('Erreur de déconnexion');
  }

  /*@Action(AuthActions.GetMe)
  getMe(ctx: StateContext<AuthStateModel>) {
    return this.authService.getMe().pipe(
      tap(user => {
        ctx.patchState({
          user,
        });
      })
    );
  }*/
}
