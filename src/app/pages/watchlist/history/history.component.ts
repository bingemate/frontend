import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HistoryState } from '../../../feature/history/store/history.state';
import { HistoryActions } from '../../../feature/history/store/history.actions';
import { HistoryModel } from '../../../shared/models/history.models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
})
export class HistoryComponent implements OnInit {
  @Select(HistoryState.history) history$!: Observable<HistoryModel[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new HistoryActions.GetAll());
  }

  deleteMedia(mediaId: number) {
    this.store.dispatch(new HistoryActions.DeleteFromHistory(mediaId));
  }
}
