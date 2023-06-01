import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  WatchlistItem,
  WatchlistResponse,
} from '../../shared/models/watchlist.models';

@Injectable()
export class WatchlistService {
  constructor(private readonly http: HttpClient) {}

  getWatchlistByUserId(userId: string): Observable<WatchlistItem[]> {
    return this.http
      .get<WatchlistResponse>(
        `${environment.apiUrl}/watch-service/watch-list/${userId}`
      )
      .pipe(map(watchlist => watchlist.watchListItems));
  }

  createWatchlistItem(item: WatchlistItem) {
    return this.http.post(
      `${environment.apiUrl}/watch-service/watch-list/${item.mediaId}`,
      item
    );
  }

  updateWatchlistItem(item: WatchlistItem) {
    return this.http.put(
      `${environment.apiUrl}/watch-service/watch-list/${item.mediaId}`,
      item
    );
  }
}
