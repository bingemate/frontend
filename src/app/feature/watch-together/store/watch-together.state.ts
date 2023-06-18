import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { WatchTogetherStateModel } from '../../../shared/models/watch-together.models';
import { WatchTogetherActions } from './watch-together.actions';
import { StreamingActions } from '../../streaming/store/streaming.actions';
import { navigationRoot } from '../../../app-routing.module';
import { streamingLinks } from '../../../pages/streaming/streaming-routing.module';
import { Router } from '@angular/router';

@State<WatchTogetherStateModel>({
  name: 'watchTogether',
  defaults: {
    joinedRoom: undefined,
    invitedRooms: [],
  },
})
@Injectable()
export class WatchTogetherState {
  readonly mediaStreamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;
  constructor(
    private store: Store,
    private router: Router,
    private ngZone: NgZone
  ) {}

  @Selector()
  static joinedRoom(state: WatchTogetherStateModel) {
    return state.joinedRoom;
  }

  @Selector()
  static status(state: WatchTogetherStateModel) {
    return state.joinedRoom?.status;
  }

  @Selector()
  static autoplay(state: WatchTogetherStateModel) {
    return state.joinedRoom?.autoplay;
  }

  @Selector()
  static position(state: WatchTogetherStateModel) {
    return state.joinedRoom?.position;
  }
  @Selector()
  static playlistPosition(state: WatchTogetherStateModel) {
    return state.joinedRoom?.playlistPosition;
  }

  @Selector()
  static invitedRooms(state: WatchTogetherStateModel) {
    return state.invitedRooms;
  }

  @Action(WatchTogetherActions.SetRooms)
  setRooms(
    ctx: StateContext<WatchTogetherStateModel>,
    payload: WatchTogetherActions.SetRooms
  ) {
    ctx.patchState({
      invitedRooms: payload.rooms,
    });
  }

  @Action(WatchTogetherActions.AddRoom)
  addRoom(
    ctx: StateContext<WatchTogetherStateModel>,
    payload: WatchTogetherActions.AddRoom
  ) {
    ctx.patchState({
      invitedRooms: [...ctx.getState().invitedRooms, payload.room],
    });
  }

  @Action(WatchTogetherActions.JoinRoom)
  joinRoom(
    ctx: StateContext<WatchTogetherStateModel>,
    payload: WatchTogetherActions.JoinRoom
  ) {
    ctx.patchState({
      joinedRoom: payload.room,
    });
  }

  @Action(WatchTogetherActions.RoomJoined)
  roomJoined(
    ctx: StateContext<WatchTogetherStateModel>,
    payload: WatchTogetherActions.RoomJoined
  ) {
    ctx.patchState({
      joinedRoom: payload.room,
    });
    if (payload.room.mediaType === 'movies') {
      this.store.dispatch(
        new StreamingActions.WatchMoviePlaylist(
          {
            id: '',
            name: 'Lecture partager',
            userId: '',
            items: payload.room.mediaIds.map(movieId => ({ movieId })),
          },
          payload.room.playlistPosition
        )
      );
    } else {
      this.store.dispatch(
        new StreamingActions.WatchEpisodePlaylist(
          {
            id: '',
            name: 'Lecture partager',
            userId: '',
            items: payload.room.mediaIds.map(episodeId => ({
              episodeId,
            })),
          },
          payload.room.playlistPosition
        )
      );
    }
    this.ngZone.run(() =>
      this.router.navigate(
        [
          this.mediaStreamPath,
          payload.room.mediaType,
          payload.room.mediaIds[payload.room.playlistPosition],
        ],
        {
          queryParams: {
            progress: payload.room.position > 0.95 ? 0 : payload.room.position,
          },
        }
      )
    );
  }

  @Action(WatchTogetherActions.LeaveRoom)
  leaveRoom(ctx: StateContext<WatchTogetherStateModel>) {
    ctx.patchState({
      joinedRoom: undefined,
    });
  }
}
