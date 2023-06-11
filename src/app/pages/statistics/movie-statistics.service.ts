import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import { Statistic } from '../../shared/models/statistic.models';
import {
  MovieStatisticApiResponse,
  toMovieStatistics,
} from '../../shared/models/movie-statistic.models';

@Injectable()
export class MovieStatisticsService {
  constructor(private readonly http: HttpClient) {}

  getStatisticsByUserId(userId: string): Observable<Statistic[]> {
    return this.http
      .get<MovieStatisticApiResponse[]>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/movie-stats/${userId}`
      )
      .pipe(map(response => toMovieStatistics(response)));
  }
}
