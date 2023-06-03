import { Component, OnInit } from '@angular/core';
import { navigationRoot } from '../../../app-routing.module';
import { streamingLinks } from '../../streaming/streaming-routing.module';
import { Select, Store } from '@ngxs/store';
import { HistoryState } from '../../../feature/history/store/history.state';
import { Observable } from 'rxjs';
import { HistoryModel } from '../../../shared/models/history.models';
import { HistoryActions } from '../../../feature/history/store/history.actions';
import { AuthState } from '../../../core/auth/store/auth.state';

@Component({
  selector: 'app-statistics-history',
  templateUrl: './statistics-history.component.html',
  styleUrls: ['./statistics-history.component.less'],
})
export class StatisticsHistoryComponent implements OnInit {
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;

  mediaStreamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  @Select(HistoryState.history) history$!: Observable<HistoryModel[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new HistoryActions.GetAll());
  }

  deleteMedia(mediaId: number) {
    this.store.dispatch(new HistoryActions.DeleteFromHistory(mediaId));
  }

  protected readonly Number = Number;
}
