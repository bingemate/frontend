import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PlaylistActions } from './playlist.actions';
import { AuthState } from '../../../core/auth/store/auth.state';
import { MoviePlaylistsService } from '../movie-playlists.service';
import { tap } from 'rxjs/operators';
import { PlaylistStateModel } from '../../../shared/models/playlist.models';
import { EpisodePlaylistsService } from '../episode-playlists.service';
import { forkJoin } from 'rxjs';

@State<PlaylistStateModel>({
  name: 'playlist',
  defaults: {
    moviePlaylists: [],
    episodePlaylists: [],
  },
})
@Injectable()
export class PlaylistState {
  constructor(
    private readonly store: Store,
    private readonly moviePlaylistsService: MoviePlaylistsService,
    private readonly episodePlaylistsService: EpisodePlaylistsService
  ) {}

  @Selector()
  static episodePlaylists(state: PlaylistStateModel) {
    return state.episodePlaylists;
  }
  @Selector()
  static moviePlaylists(state: PlaylistStateModel) {
    return state.moviePlaylists;
  }

  @Action(PlaylistActions.GetCurrentUserPlaylists)
  getCurrentUserPlaylists(ctx: StateContext<PlaylistStateModel>) {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (!userId) {
      return;
    }

    return forkJoin([
      this.episodePlaylistsService.getPlaylists(userId).pipe(
        tap(episodePlaylists =>
          ctx.patchState({
            episodePlaylists,
          })
        )
      ),
      this.moviePlaylistsService.getMoviePlaylists(userId).pipe(
        tap(moviePlaylists =>
          ctx.patchState({
            moviePlaylists,
          })
        )
      ),
    ]);
  }
}
