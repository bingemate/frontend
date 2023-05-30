import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MovieResponse,
  TvEpisodeResponse,
  TvShowResponse,
} from '../../shared/models/media.models';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private readonly http: HttpClient) {}

  getFollowedShowsReleases(
    month?: number
  ): Observable<{ episodes: TvEpisodeResponse[]; tvShows: TvShowResponse[] }> {
    if (!month || month < 1 || month > 12) {
      month = new Date().getMonth() + 1;
    }

    const params = new HttpParams().set('month', month);
    return this.http.get<{
      episodes: TvEpisodeResponse[];
      tvShows: TvShowResponse[];
    }>(API_RESOURCE_URI.MEDIA_INFO + '/calendar/tvshows', { params });
  }

  getFollowedMoviesReleases(month?: number): Observable<MovieResponse[]> {
    if (!month || month < 1 || month > 12) {
      month = new Date().getMonth() + 1;
    }

    const params = new HttpParams().set('month', month);
    return this.http.get<MovieResponse[]>(
      API_RESOURCE_URI.MEDIA_INFO + '/calendar/movies',
      { params }
    );
  }
}
