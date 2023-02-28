import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ThemeService, ThemeType } from '../theme.service';
import { InitTheme, ToggleTheme } from './theme.actions';

export interface ThemeStateModel {
  theme: ThemeType;
}

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

  @Action(ToggleTheme)
  async toggleTheme(ctx: StateContext<ThemeStateModel>) {
    const state = ctx.getState();
    const theme = this.themeService.reverseTheme(state.theme);

    await this.themeService.setTheme(theme);
    ctx.patchState({
      ...state,
      theme,
    });
  }

  @Action(InitTheme)
  async initTheme(ctx: StateContext<ThemeStateModel>) {
    const state = ctx.getState();
    await this.themeService.loadTheme(state.theme);
  }
}
