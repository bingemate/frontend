import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AlbumsActions } from '../../../feature/albums/store/albums.actions';
import { AlbumModel } from '../../../shared/models/album.models';
import { Observable } from 'rxjs';
import { HistoryState } from '../../../feature/history/store/history.state';
import { HistoryActions } from '../../../feature/history/store/history.actions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
})
export class HistoryComponent implements OnInit {
  @Select(HistoryState.history) history$!: Observable<AlbumModel[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new HistoryActions.GetAll());
  }
}
