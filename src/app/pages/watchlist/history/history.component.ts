import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AlbumsActions } from '../../../feature/albums/store/albums.actions';
import { AlbumsState } from '../../../feature/albums/store/albums.state';
import { AlbumModel } from '../../../shared/models/album.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
})
export class HistoryComponent implements OnInit {
  @Select(AlbumsState.albums) history$!: Observable<AlbumModel[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new AlbumsActions.GetAll());
  }
}
