import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ThemeAction } from './theme.actions';
import {
  ThemeStateModel,
  ThemeType,
} from '../../../shared/models/theme.models';
import { ThemeService } from '../theme.service';

@State<ThemeStateModel>({
  name: 'theme',
  defaults: {
    theme: ThemeType.default,
  },
})
@Injectable()
export class ThemeState {
  constructor(private readonly themeService: ThemeService) {}

  @Selector()
  static theme(state: ThemeStateModel) {
    return state.theme;
  }

  @Selector()
  static isDarkTheme(state: ThemeStateModel) {
    return state.theme === ThemeType.dark;
  }

  @Action(ThemeAction.Toggle)
  async toggleTheme(ctx: StateContext<ThemeStateModel>) {
    const state = ctx.getState();
    const theme = this.themeService.reverseTheme(state.theme);

    await this.themeService.setTheme(theme);
    ctx.patchState({
      theme,
    });
  }

  @Action(ThemeAction.Init)
  async initTheme(ctx: StateContext<ThemeStateModel>) {
    const state = ctx.getState();
    await this.themeService.loadTheme(state.theme);
  }
}
