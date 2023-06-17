import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { WatchTogetherStateModel } from '../../../shared/models/watch-together.models';
import { WatchTogetherActions } from './watch-together.actions';

@State<WatchTogetherStateModel>({
  name: 'watchTogether',
  defaults: {
    joinedRoom: undefined,
    invitedRooms: [],
  },
})
@Injectable()
export class WatchTogetherState {
  constructor(private store: Store) {}

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

  @Action(WatchTogetherActions.LeaveRoom)
  leaveRoom(ctx: StateContext<WatchTogetherStateModel>) {
    ctx.patchState({
      joinedRoom: undefined,
    });
  }
}
