import { MediaSearchStateModel } from '../../../shared/models/media.models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MediaSearchActions } from './media-search.actions';
import { MediaDiscoverService } from '../../media-info/media-discover.service';

@State<MediaSearchStateModel>({
  name: 'mediaSearch',
  defaults: {
    query: '',
    adult: false,
    movies: {
      results: [],
      totalPage: 0,
      totalResult: 0,
    },
    tvShows: {
      results: [],
      totalPage: 0,
      totalResult: 0,
    },
    moviesCurrentPage: 1,
    tvShowsCurrentPage: 1,
    moviesError: '',
    tvShowsError: '',
    moviesLoading: false,
    tvShowsLoading: false,
    hasMoviesError: false,
    hasTvShowsError: false,
  },
})
@Injectable()
export class MediaSearchState {
  constructor(private mediaDiscoverService: MediaDiscoverService) {}

  @Selector()
  static query(state: MediaSearchStateModel) {
    return state.query;
  }

  @Selector()
  static movies(state: MediaSearchStateModel) {
    return state.movies;
  }

  @Selector()
  static tvShows(state: MediaSearchStateModel) {
    return state.tvShows;
  }

  @Selector()
  static moviesCurrentPage(state: MediaSearchStateModel) {
    return state.moviesCurrentPage;
  }

  @Selector()
  static tvShowsCurrentPage(state: MediaSearchStateModel) {
    return state.tvShowsCurrentPage;
  }

  @Selector()
  static moviesError(state: MediaSearchStateModel) {
    return state.moviesError;
  }

  @Selector()
  static tvShowsError(state: MediaSearchStateModel) {
    return state.tvShowsError;
  }

  @Selector()
  static moviesLoading(state: MediaSearchStateModel) {
    return state.moviesLoading;
  }

  @Selector()
  static tvShowsLoading(state: MediaSearchStateModel) {
    return state.tvShowsLoading;
  }

  @Selector()
  static hasMoviesError(state: MediaSearchStateModel) {
    return state.hasMoviesError;
  }

  @Selector()
  static hasTvShowsError(state: MediaSearchStateModel) {
    return state.hasTvShowsError;
  }

  @Selector()
  static adult(state: MediaSearchStateModel) {
    return state.adult;
  }

  @Action(MediaSearchActions.Adult)
  adult(
    ctx: StateContext<MediaSearchStateModel>,
    action: MediaSearchActions.Adult
  ) {
    ctx.patchState({
      adult: action.payload,
    });
  }

  @Action(MediaSearchActions.Search)
  search(
    ctx: StateContext<MediaSearchStateModel>,
    action: MediaSearchActions.Search
  ) {
    ctx.patchState({
      query: action.payload.query,
    });
    ctx.dispatch(
      new MediaSearchActions.SearchMovie({
        page: 1,
        onlyAvailable: action.payload.onlyAvailable,
      })
    );
    ctx.dispatch(
      new MediaSearchActions.SearchTv({
        page: 1,
        onlyAvailable: action.payload.onlyAvailable,
      })
    );
  }

  @Action(MediaSearchActions.SearchMovie)
  searchMovie(
    ctx: StateContext<MediaSearchStateModel>,
    action: MediaSearchActions.SearchMovie
  ) {
    ctx.patchState({
      moviesLoading: true,
      hasMoviesError: false,
      moviesCurrentPage: action.payload.page,
    });
    this.mediaDiscoverService
      .searchMovies(
        ctx.getState().query,
        action.payload.page,
        action.payload.onlyAvailable,
        ctx.getState().adult
      )
      .subscribe({
        next: response => {
          ctx.patchState({
            movies: response,
            moviesLoading: false,
          });
        },
        error: error => {
          ctx.patchState({
            moviesError: error.error.error,
            moviesLoading: false,
            hasMoviesError: true,
          });
        },
      });
  }

  @Action(MediaSearchActions.SearchTv)
  searchTv(
    ctx: StateContext<MediaSearchStateModel>,
    action: MediaSearchActions.SearchTv
  ) {
    ctx.patchState({
      tvShowsLoading: true,
      hasTvShowsError: false,
      tvShowsCurrentPage: action.payload.page,
    });
    this.mediaDiscoverService
      .searchTvShows(
        ctx.getState().query,
        action.payload.page,
        action.payload.onlyAvailable,
        ctx.getState().adult
      )
      .subscribe({
        next: response => {
          ctx.patchState({
            tvShows: response,
            tvShowsLoading: false,
          });
        },
        error: error => {
          ctx.patchState({
            tvShowsError: error.error.error,
            tvShowsLoading: false,
            hasTvShowsError: true,
          });
        },
      });
  }
}
