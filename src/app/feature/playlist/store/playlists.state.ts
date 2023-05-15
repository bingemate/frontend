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
    payload: GetUserPlaylists
  ) {
    return this.playlistsService.getPlaylists(payload.userId).pipe(
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
    payload: DeletePlaylist
  ) {
    const playlists = ctx
      .getState()
      .playlists.filter(playlist => playlist.id !== payload.playlistId);
    return this.playlistsService.deletePlaylist(payload.playlistId).pipe(
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
    payload: CreatePlaylist
  ) {
    return this.playlistsService
      .createPlaylist(payload.createPlaylistApiRequest)
      .pipe(
        tap(playlistId => {
          ctx.patchState({
            playlists: [
              ...ctx.getState().playlists,
              {
                id: playlistId.id,
                name: payload.createPlaylistApiRequest.name,
                userId: '',
                items: [],
              },
            ],
          });
        })
      );
  }

  @Action(PlaylistsActions.GetPlaylistItems)
  getPlaylistItems(
    ctx: StateContext<PlaylistStateModel>,
    payload: GetPlaylistItems
  ) {
    return this.playlistsService.getPlaylistItems(payload.playlistId).pipe(
      tap(items => {
        const playlist = ctx
          .getState()
          .playlists.find(playlist => playlist.id === payload.playlistId);
        const playlists = ctx
          .getState()
          .playlists.filter(playlist => playlist.id !== payload.playlistId);

        if (playlist) {
          ctx.patchState({
            playlists: [
              {
                ...playlist,
                items,
              },
              ...playlists,
            ],
          });
        }
      })
    );
  }

  @Action(PlaylistsActions.ReorderPlaylistItems)
  reorderPlaylist(
    ctx: StateContext<PlaylistStateModel>,
    payload: ReorderPlaylistItems
  ) {
    return this.playlistsService
      .updatePlaylistOrder(payload.id, {
        items: payload.playlistItems,
      })
      .pipe(
        tap(() => {
          let playlist = ctx
            .getState()
            .playlists.find(playlist => playlist.id === payload.id);
          const playlists = ctx
            .getState()
            .playlists.filter(playlist => playlist.id !== payload.id);
          if (playlist) {
            playlist = {
              ...playlist,
              items: payload.playlistItems,
            };

            ctx.patchState({
              playlists: [playlist, ...playlists],
            });
          }
        })
      );
  }
}
