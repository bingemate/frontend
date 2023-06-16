import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  CreateMovieWatchlistItem,
  MovieWatchlistItem,
  MovieWatchlistResponse,
} from '../../shared/models/movie-watchlist.models';

@Injectable()
export class MovieWatchlistService {
  constructor(private readonly http: HttpClient) {}

  getWatchlistByUserId(userId: string): Observable<MovieWatchlistItem[]> {
    return this.http
      .get<MovieWatchlistResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/movie-watchlist/${userId}`
      )
      .pipe(map(watchlist => watchlist.watchListItems));
  }

  createWatchlistItem(item: CreateMovieWatchlistItem) {
    return this.http.post(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-watchlist/${item.movieId}`,
      item
    );
  }

  updateWatchlistItem(item: MovieWatchlistItem) {
    return this.http.put(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-watchlist/${item.movieId}`,
      item
    );
  }

  getWatchlistItem(mediaId: number) {
    return this.http.get<MovieWatchlistItem>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-watchlist/${mediaId}/item`
    );
  }

  removeFromWatchlist(mediaId: number) {
    return this.http.delete(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-watchlist/${mediaId}`
    );
  }
}
