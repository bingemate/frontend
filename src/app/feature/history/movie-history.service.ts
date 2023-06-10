import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  MovieHistoryListAPIResponse,
  toMovieHistoryList,
} from '../../shared/models/movie-history.models';
import { HistoryModel } from '../../shared/models/history.models';

@Injectable({
  providedIn: 'root',
})
export class MovieHistoryService {
  constructor(private readonly http: HttpClient) {}

  getMovieHistory(): Observable<HistoryModel[]> {
    return this.http
      .get<MovieHistoryListAPIResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/movie-history`
      )
      .pipe(map(response => toMovieHistoryList(response)));
  }

  deleteMovieHistory(mediaId: number): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-history/${mediaId}`
    );
  }
}
