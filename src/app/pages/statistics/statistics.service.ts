import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Statistic,
  StatisticApiResponse,
  toStatistics,
} from '../../shared/models/statistic';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable()
export class StatisticsService {
  constructor(private readonly http: HttpClient) {}

  getStatisticsByUserId(userId: string): Observable<Statistic[]> {
    return this.http
      .get<StatisticApiResponse[]>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/stats/${userId}`
      )
      .pipe(map(response => toStatistics(response)));
  }
}
