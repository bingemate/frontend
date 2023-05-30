import { Action, State, StateContext } from '@ngxs/store';
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

  @Action(StreamingActions.WatchPlaylist)
  watchPlaylist(
    ctx: StateContext<StreamingStateModel>,
    payload: StreamingActions.WatchPlaylist
  ) {
    ctx.patchState({
      playlist: payload.playlist,
      position: payload.position,
    });
    this.router
      .navigate([
        '/streaming/stream',
        ctx.getState().playlist?.items[payload.position].mediaId,
      ])
      .then();
  }
  @Action(StreamingActions.SeekMediaPlaylist)
  seekMedia(
    ctx: StateContext<StreamingStateModel>,
    payload: StreamingActions.SeekMediaPlaylist
  ) {
    ctx.patchState({
      position: payload.position,
    });
    this.router
      .navigate([
        '/streaming/stream',
        ctx.getState().playlist?.items[payload.position].mediaId,
      ])
      .then();
  }

  @Action(StreamingActions.MediaEndedPlaylist)
  mediaEnded(ctx: StateContext<StreamingStateModel>) {
    const position = ctx.getState().position + 1;
    if (
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
}
