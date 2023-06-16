import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  CreateTvShowWatchlistItem,
  TvShowWatchlistItem,
  TvShowWatchlistResponse,
} from '../../shared/models/tv-show-watchlist.models';

@Injectable()
export class TvShowWatchlistService {
  constructor(private readonly http: HttpClient) {}

  getWatchlistByUserId(userId: string): Observable<TvShowWatchlistItem[]> {
    return this.http
      .get<TvShowWatchlistResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/tv-show-watchlist/${userId}`
      )
      .pipe(map(watchlist => watchlist.watchListItems));
  }

  createWatchlistItem(item: CreateTvShowWatchlistItem) {
    return this.http.post(
      `${API_RESOURCE_URI.WATCH_SERVICE}/tv-show-watchlist/${item.tvShowId}`,
      item
    );
  }

  updateWatchlistItem(item: TvShowWatchlistItem) {
    return this.http.put(
      `${API_RESOURCE_URI.WATCH_SERVICE}/tv-show-watchlist/${item.tvShowId}`,
      item
    );
  }

  getWatchlistItem(mediaId: number) {
    return this.http.get<TvShowWatchlistItem>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/tv-show-watchlist/${mediaId}/item`
    );
  }

  removeFromWatchlist(mediaId: number) {
    return this.http.delete(
      `${API_RESOURCE_URI.WATCH_SERVICE}/tv-show-watchlist/${mediaId}`
    );
  }
}
