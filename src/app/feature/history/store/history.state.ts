import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HistoryService } from '../history.service';
import { HistoryActions } from './history.actions';
import { tap } from 'rxjs/operators';
import { HistoryStateModel } from '../../../shared/models/history.models';
import DeleteFromHistory = HistoryActions.DeleteFromHistory;

@State<HistoryStateModel>({
  name: 'history',
  defaults: {
    history: [],
  },
})
@Injectable()
export class HistoryState {
  constructor(private readonly historyService: HistoryService) {}

  @Selector()
  static history(state: HistoryStateModel) {
    return state.history;
  }

  @Action(HistoryActions.GetAll)
  getAll(ctx: StateContext<HistoryStateModel>) {
    return this.historyService.getHistory().pipe(
      tap(history => {
        ctx.patchState({
          history,
        });
      })
    );
  }

  @Action(HistoryActions.DeleteFromHistory)
  deleteFromHistory(
    ctx: StateContext<HistoryStateModel>,
    payload: DeleteFromHistory
  ) {
    const history = ctx
      .getState()
      .history.filter(history => history.mediaId !== payload.mediaId);
    return this.historyService.deleteHistory(payload.mediaId).pipe(
      tap(() => {
        ctx.patchState({
          history,
        });
      })
    );
  }
}
