import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AlbumsService } from '../albums.service';
import { AlbumsStateModel } from '../../../shared/models/album.models';
import { AlbumsActions } from './albums.actions';
import { tap } from 'rxjs/operators';

@State<AlbumsStateModel>({
  name: 'albums',
  defaults: {
    albums: [],
    currentAlbumId: null,
  },
})
@Injectable()
export class AlbumsState {
  constructor(private readonly albumService: AlbumsService) {}

  @Selector()
  static albums(state: AlbumsStateModel) {
    return state.albums;
  }

  @Action(AlbumsActions.GetAll)
  getAll(ctx: StateContext<AlbumsStateModel>) {
    return this.albumService.getAlbums().pipe(
      tap(albums => {
        ctx.patchState({
          albums,
        });
      })
    );
  }

  /*  @Selector()
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
  }*/
}
