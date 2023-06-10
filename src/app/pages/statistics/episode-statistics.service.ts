import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  EpisodeStatisticApiResponse,
  toEpisodeStatistics,
} from '../../shared/models/episode-statistic.models';
import { Statistic } from '../../shared/models/statistic.models';

@Injectable()
export class EpisodeStatisticsService {
  constructor(private readonly http: HttpClient) {}

  getStatisticsByUserId(userId: string): Observable<Statistic[]> {
    return this.http
      .get<EpisodeStatisticApiResponse[]>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/episode-stats/${userId}`
      )
      .pipe(map(response => toEpisodeStatistics(response)));
  }
}
