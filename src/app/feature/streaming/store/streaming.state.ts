import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StreamingStateModel } from '../../../shared/models/streaming.model';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StreamingActions } from './streaming.actions';

@State<StreamingStateModel>({
  name: 'streaming',
  defaults: {
    playlist: undefined,
    position: 0,
    autoplay: true,
  },
})
@Injectable()
export class StreamingState {
  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

  @Selector()
  static playlist(state: StreamingStateModel) {
    return state.playlist;
  }

  @Selector()
  static autoplay(state: StreamingStateModel) {
    return state.autoplay;
  }

  @Selector()
  static position(state: StreamingStateModel) {
    return state.position;
  }

  @Action(StreamingActions.WatchPlaylist)
  watchPlaylist(
    ctx: StateContext<StreamingStateModel>,
    payload: StreamingActions.WatchPlaylist
  ) {
    ctx.patchState({
      playlist: payload.playlist,
      position: payload.position,
    });
    this.ngZone.run(() => {
      this.router
        .navigate([
          '/streaming/stream',
          ctx.getState().playlist?.items[payload.position].mediaId,
        ])
        .then();
    });
  }

  @Action(StreamingActions.SeekMediaPlaylist)
  seekMedia(
    ctx: StateContext<StreamingStateModel>,
    payload: StreamingActions.SeekMediaPlaylist
  ) {
    ctx.patchState({
      position: payload.position,
    });
    this.ngZone.run(() => {
      this.router
        .navigate([
          '/streaming/stream',
          ctx.getState().playlist?.items[payload.position].mediaId,
        ])
        .then();
    });
  }

  @Action(StreamingActions.MediaEndedPlaylist)
  mediaEnded(ctx: StateContext<StreamingStateModel>) {
    const position = ctx.getState().position + 1;
    if (
      !ctx.getState().autoplay ||
      !ctx.getState().playlist ||
      position === ctx.getState().playlist?.items.length
    ) {
      return;
    }
    ctx.patchState({
      position,
    });
    this.ngZone.run(() => {
      this.router
        .navigate([
          '/streaming/stream',
          ctx.getState().playlist?.items[position].mediaId,
        ])
        .then();
    });
  }

  @Action(StreamingActions.AutoplayToggle)
  autoplayToggle(
    ctx: StateContext<StreamingStateModel>,
    payload: StreamingActions.AutoplayToggle
  ) {
    ctx.patchState({
      autoplay: payload.autoplay,
    });
  }
}
