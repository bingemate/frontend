import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from '../../../shared/models/auth.models';
import { Injectable } from '@angular/core';
import { UserModel } from '../../../shared/models/user.models';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { NotificationsService } from '../../notifications/notifications.service';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    user: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Selector([AuthState.token])
  static isAuthenticated(state: AuthStateModel, token: string | null) {
    return token !== null;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector([AuthState.user])
  static isAdmin(user: UserModel | null) {
    return !!user && user.role === 'admin';
  }

  constructor(
    private readonly authService: AuthService,
    private notificationService: NotificationsService
  ) {}

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    return this.authService.login(action.payload).pipe(
      tap(token => {
        ctx.patchState({
          token,
        });
      }),
      mergeMap(() => {
        return ctx.dispatch(new AuthActions.LoginSuccess());
      }),
      catchError(error => {
        console.error(error);
        return ctx.dispatch(new AuthActions.LoginFailure());
      })
    );
  }

  @Action(AuthActions.LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>) {
    this.notificationService.success('Vous êtes connecté');
    return ctx.dispatch(new AuthActions.GetMe());
  }

  @Action(AuthActions.LoginFailure)
  loginError() {
    this.notificationService.error('Erreur de connexion');
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.patchState({
          token: null,
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

  @Action(AuthActions.GetMe)
  getMe(ctx: StateContext<AuthStateModel>) {
    return this.authService.getMe().pipe(
      tap(user => {
        ctx.patchState({
          user,
        });
      })
    );
  }
}
