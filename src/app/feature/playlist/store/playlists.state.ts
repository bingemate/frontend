import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PlaylistsService } from '../playlists.service';

import { tap } from 'rxjs/operators';
import { PlaylistsActions } from './playlists.actions';
import {
  CreatePlaylistApiRequest,
  PlaylistStateModel,
} from '../../../shared/models/playlist.model';

@State<PlaylistStateModel>({
  name: 'playlists',
  defaults: {
    playlists: [],
  },
})
@Injectable()
export class PlaylistsState {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Selector()
  static playlists(state: PlaylistStateModel) {
    return state.playlists;
  }

  @Action(PlaylistsActions.GetUserPlaylists)
  getUserPlaylists(ctx: StateContext<PlaylistStateModel>, userId: string) {
    return this.playlistsService.getPlaylists(userId).pipe(
      tap(playlists => {
        ctx.patchState({
          playlists,
        });
      })
    );
  }
  @Action(PlaylistsActions.DeletePlaylist)
  deletePlaylist(ctx: StateContext<PlaylistStateModel>, playlistId: string) {
    const playlists = ctx
      .getState()
      .playlists.filter(playlist => playlist.id !== playlistId);
    return this.playlistsService.deletePlaylist(playlistId).pipe(
      tap(() => {
        ctx.patchState({
          playlists,
        });
      })
    );
  }
  @Action(PlaylistsActions.CreatePlaylist)
  createPlaylist(
    ctx: StateContext<PlaylistStateModel>,
    playlistApiRequest: CreatePlaylistApiRequest
  ) {
    return this.playlistsService.createPlaylist(playlistApiRequest).pipe(
      tap(playlistId => {
        ctx.patchState({
          playlists: [
            ...ctx.getState().playlists,
            {
              id: playlistId,
              name: playlistApiRequest.name,
              userId: '',
            },
          ],
        });
      })
    );
  }
}
