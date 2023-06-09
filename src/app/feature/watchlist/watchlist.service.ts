import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreateWatchlistItem,
  WatchlistItem,
  WatchlistResponse,
} from '../../shared/models/watchlist.models';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable()
export class WatchlistService {
  constructor(private readonly http: HttpClient) {}

  getWatchlistByUserId(userId: string): Observable<WatchlistItem[]> {
    return this.http
      .get<WatchlistResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/watch-list/${userId}`
      )
      .pipe(map(watchlist => watchlist.watchListItems));
  }

  createWatchlistItem(item: CreateWatchlistItem) {
    return this.http.post(
      `${API_RESOURCE_URI.WATCH_SERVICE}/watch-list/${item.mediaId}`,
      item
    );
  }

  updateWatchlistItem(item: WatchlistItem) {
    return this.http.put(
      `${API_RESOURCE_URI.WATCH_SERVICE}/watch-list/${item.mediaId}`,
      item
    );
  }

  getWatchlistItem(mediaId: number) {
    return this.http.get<WatchlistItem>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/watch-list/${mediaId}/item`
    );
  }

  removeFromWatchlist(mediaId: number) {
    return this.http.delete(
      `${API_RESOURCE_URI.WATCH_SERVICE}/watch-list/${mediaId}`
    );
  }
}
