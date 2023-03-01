import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AlbumsActions } from '../../../feature/albums/store/albums.actions';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.less'],
})
export class WatchlistComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('WatchlistComponent.ngOnInit');
    this.store.dispatch(new AlbumsActions.GetAll());
  }
}
