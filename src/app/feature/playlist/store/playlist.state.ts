import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  PlaylistStateModel,
  PlaylistType,
} from '../../../shared/models/playlist.model';
import { PlaylistActions } from './playlist.actions';
import { AuthState } from '../../../core/auth/store/auth.state';
import { PlaylistsService } from '../playlists.service';
import { tap } from 'rxjs/operators';

@State<PlaylistStateModel>({
  name: 'playlist',
  defaults: {
    playlists: [],
  },
})
@Injectable()
export class PlaylistState {
  constructor(
    private readonly store: Store,
    private readonly playlistsService: PlaylistsService
  ) {}

  @Selector()
  static episodePlaylists(state: PlaylistStateModel) {
    return state.playlists.filter(
      playlist => playlist.type === PlaylistType.EPISODE
    );
  }
  @Selector()
  static moviePlaylists(state: PlaylistStateModel) {
    return state.playlists.filter(
      playlist => playlist.type === PlaylistType.MOVIE
    );
  }

  @Action(PlaylistActions.GetCurrentUserPlaylists)
  autoplayToggle(ctx: StateContext<PlaylistStateModel>) {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (!userId) {
      return;
    }

    return this.playlistsService.getPlaylists(userId).pipe(
      tap(playlists =>
        ctx.patchState({
          playlists,
        })
      )
    );
  }
}
