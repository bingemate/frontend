import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StreamingStateModel } from '../../../shared/models/streaming.model';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StreamingActions } from './streaming.actions';

@State<StreamingStateModel>({
  name: 'streaming',
  defaults: {
    episodePlaylist: undefined,
    moviePlaylist: undefined,
    type: undefined,
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
  static episodePlaylist(state: StreamingStateModel) {
    return state.episodePlaylist;
  }

  @Selector()
  static type(state: StreamingStateModel) {
    return state.type;
  }

  @Selector()
  static moviePlaylist(state: StreamingStateModel) {
    return state.moviePlaylist;
  }

  @Selector()
  static autoplay(state: StreamingStateModel) {
    return state.autoplay;
  }

  @Selector()
  static position(state: StreamingStateModel) {
    return state.position;
  }

  @Action(StreamingActions.WatchMoviePlaylist)
  watchMoviePlaylist(
    ctx: StateContext<StreamingStateModel>,
    payload: StreamingActions.WatchMoviePlaylist
  ) {
    ctx.patchState({
      type: 'movies',
      moviePlaylist: payload.playlist,
      episodePlaylist: undefined,
      position: payload.position,
    });
    this.ngZone.run(() => {
      this.router
        .navigate([
          '/streaming/stream',
          'movies',
          ctx.getState().moviePlaylist?.items[payload.position].movieId,
        ])
        .then();
    });
  }

  @Action(StreamingActions.WatchEpisodePlaylist)
  watchEpisodePlaylist(
    ctx: StateContext<StreamingStateModel>,
    payload: StreamingActions.WatchEpisodePlaylist
  ) {
    ctx.patchState({
      type: 'tv-shows',
      moviePlaylist: undefined,
      episodePlaylist: payload.playlist,
      position: payload.position,
    });
    if (payload.redirect) {
      this.ngZone.run(() => {
        this.router
          .navigate([
            '/streaming/stream',
            'tv-shows',
            ctx.getState().moviePlaylist?.items[payload.position].movieId,
          ])
          .then();
      });
    }
  }

  @Action(StreamingActions.SeekMediaPlaylist)
  seekMedia(
    ctx: StateContext<StreamingStateModel>,
    payload: StreamingActions.SeekMediaPlaylist
  ) {
    ctx.patchState({
      position: payload.position,
    });
    const id =
      ctx.getState().type === 'movies'
        ? ctx.getState().moviePlaylist?.items[payload.position].movieId
        : ctx.getState().episodePlaylist?.items[payload.position].episodeId;
    this.ngZone.run(() => {
      this.router
        .navigate(['/streaming/stream', ctx.getState().type, id])
        .then();
    });
  }

  @Action(StreamingActions.MediaEndedPlaylist)
  mediaEnded(ctx: StateContext<StreamingStateModel>) {
    const position = ctx.getState().position + 1;
    const id =
      ctx.getState().type === 'movies'
        ? ctx.getState().moviePlaylist?.items[position].movieId
        : ctx.getState().episodePlaylist?.items[position].episodeId;
    const playlist =
      ctx.getState().type === 'movies'
        ? ctx.getState().moviePlaylist
        : ctx.getState().episodePlaylist;
    if (
      !ctx.getState().autoplay ||
      !playlist ||
      position === playlist?.items.length
    ) {
      return;
    }
    ctx.patchState({
      position,
    });
    this.ngZone.run(() => {
      this.router
        .navigate(['/streaming/stream', ctx.getState().type, id])
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
