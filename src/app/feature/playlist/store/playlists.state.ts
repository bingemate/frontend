import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PlaylistsService } from '../playlists.service';

import { tap } from 'rxjs/operators';
import { PlaylistsActions } from './playlists.actions';
import { PlaylistStateModel } from '../../../shared/models/playlist.model';
import CreatePlaylist = PlaylistsActions.CreatePlaylist;
import DeletePlaylist = PlaylistsActions.DeletePlaylist;
import GetUserPlaylists = PlaylistsActions.GetUserPlaylists;
import GetPlaylistItems = PlaylistsActions.GetPlaylistItems;
import ReorderPlaylistItems = PlaylistsActions.ReorderPlaylistItems;

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
  getUserPlaylists(
    ctx: StateContext<PlaylistStateModel>,
    userId: GetUserPlaylists
  ) {
    return this.playlistsService.getPlaylists(userId.payload).pipe(
      tap(playlists => {
        console.log(playlists);
        ctx.patchState({
          playlists,
        });
      })
    );
  }
  @Action(PlaylistsActions.DeletePlaylist)
  deletePlaylist(
    ctx: StateContext<PlaylistStateModel>,
    playlistId: DeletePlaylist
  ) {
    const playlists = ctx
      .getState()
      .playlists.filter(playlist => playlist.id !== playlistId.payload);
    return this.playlistsService.deletePlaylist(playlistId.payload).pipe(
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
    createPlaylist: CreatePlaylist
  ) {
    return this.playlistsService.createPlaylist(createPlaylist.payload).pipe(
      tap(playlistId => {
        ctx.patchState({
          playlists: [
            ...ctx.getState().playlists,
            {
              id: playlistId.id,
              name: createPlaylist.payload.name,
              userId: '',
            },
          ],
        });
      })
    );
  }
  @Action(PlaylistsActions.GetPlaylistItems)
  getPlaylistItems(
    ctx: StateContext<PlaylistStateModel>,
    playlistId: GetPlaylistItems
  ) {
    return this.playlistsService.getPlaylistItems(playlistId.payload).pipe(
      tap(items => {
        const playlist = ctx
          .getState()
          .playlists.find(playlist => playlist.id === playlistId.payload)!;
        const playlists = ctx
          .getState()
          .playlists.filter(playlist => playlist.id !== playlistId.payload)!;

        ctx.patchState({
          playlists: [
            ...playlists,
            {
              ...playlist,
              items,
            },
          ],
        });
      })
    );
  }
  @Action(PlaylistsActions.ReorderPlaylistItems)
  reorderPlaylist(
    ctx: StateContext<PlaylistStateModel>,
    reorderPlaylist: ReorderPlaylistItems
  ) {
    return this.playlistsService
      .updatePlaylistOrder(reorderPlaylist.id, {
        items: reorderPlaylist.playlistItems,
      })
      .pipe(
        tap(() => {
          let playlist = ctx
            .getState()
            .playlists.find(playlist => playlist.id === reorderPlaylist.id)!;
          const playlists = ctx
            .getState()
            .playlists.filter(playlist => playlist.id !== reorderPlaylist.id)!;
          playlist = {
            ...playlist,
            items: reorderPlaylist.playlistItems,
          };

          ctx.patchState({
            playlists: [...playlists, playlist],
          });
        })
      );
  }
}
