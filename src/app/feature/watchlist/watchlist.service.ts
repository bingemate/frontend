import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreateWatchlistItem,
  WatchlistItem,
  WatchlistResponse,
} from '../../shared/models/watchlist.models';

@Injectable()
export class WatchlistService {
  constructor(private readonly http: HttpClient) {}

  getWatchlistByUserId(userId: string): Observable<WatchlistItem[]> {
    return this.http
      .get<WatchlistResponse>(`http://localhost:3000/watch-list/${userId}`)
      .pipe(map(watchlist => watchlist.watchListItems));
  }

  createWatchlistItem(item: CreateWatchlistItem) {
    return this.http.post(
      `http://localhost:3000/watch-list/${item.mediaId}`,
      item
    );
  }

  updateWatchlistItem(item: WatchlistItem) {
    return this.http.put(
      `http://localhost:3000/watch-list/${item.mediaId}`,
      item
    );
  }

  getWatchlistItem(mediaId: number) {
    return this.http.get<WatchlistItem>(
      `http://localhost:3000/watch-list/${mediaId}/item`
    );
  }

  removeFromWatchlist(mediaId: number) {
    return this.http.delete(`http://localhost:3000/watch-list/${mediaId}`);
  }
}
