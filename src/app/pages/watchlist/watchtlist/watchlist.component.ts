import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AlbumsActions } from '../../../feature/albums/store/albums.actions';
import { AlbumsState } from '../../../feature/albums/store/albums.state';
import { AlbumModel } from '../../../shared/models/album.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.less'],
})
export class WatchlistComponent implements OnInit {
  @Select(AlbumsState.albums) albums$!: Observable<AlbumModel[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('WatchlistComponent.ngOnInit');
    this.store.dispatch(new AlbumsActions.GetAll());
  }
}
