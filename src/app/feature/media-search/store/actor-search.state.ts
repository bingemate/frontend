import { ActorSearchStateModel } from '../../../shared/models/media.models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MediaDiscoverService } from '../../media-info/media-discover.service';
import { ActorSearchActions } from './actor-search.actions';

@State<ActorSearchStateModel>({
  name: 'actorSearch',
  defaults: {
    query: '',
    actors: {
      results: [],
      totalPage: 0,
      totalResult: 0,
    },
    currentPage: 1,
    error: '',
    loading: false,
    hasError: false,
    adult: false,
  },
})
@Injectable()
export class ActorSearchState {
  constructor(private mediaDiscoverService: MediaDiscoverService) {}

  @Selector()
  static query(state: ActorSearchStateModel) {
    return state.query;
  }

  @Selector()
  static actors(state: ActorSearchStateModel) {
    return state.actors;
  }

  @Selector()
  static currentPage(state: ActorSearchStateModel) {
    return state.currentPage;
  }

  @Selector()
  static error(state: ActorSearchStateModel) {
    return state.error;
  }

  @Selector()
  static loading(state: ActorSearchStateModel) {
    return state.loading;
  }

  @Selector()
  static hasError(state: ActorSearchStateModel) {
    return state.hasError;
  }

  @Selector()
  static adult(state: ActorSearchStateModel) {
    return state.adult;
  }

  @Action(ActorSearchActions.Adult)
  adult(
    ctx: StateContext<ActorSearchStateModel>,
    action: ActorSearchActions.Adult
  ) {
    ctx.patchState({
      adult: action.payload,
    });
  }

  @Action(ActorSearchActions.Search)
  searchActor(
    ctx: StateContext<ActorSearchStateModel>,
    action: ActorSearchActions.Search
  ) {
    ctx.patchState({
      query: action.payload.query,
      loading: true,
      hasError: false,
      error: '',
      currentPage: action.payload.page,
    });

    this.mediaDiscoverService
      .searchActors(
        ctx.getState().query,
        action.payload.page,
        ctx.getState().adult
      )
      .subscribe({
        next: response => {
          ctx.patchState({
            actors: response,
            loading: false,
          });
        },
        error: error => {
          ctx.patchState({
            error: error.error.error,
            hasError: true,
            loading: false,
          });
        },
      });
  }

  @Action(ActorSearchActions.PageChange)
  pageChange(
    ctx: StateContext<ActorSearchStateModel>,
    action: ActorSearchActions.PageChange
  ) {
    ctx.dispatch(
      new ActorSearchActions.Search({
        query: ctx.getState().query,
        page: action.payload,
      })
    );
  }
}
