import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Statistic,
  StatisticApiResponse,
  toStatistics,
} from '../../shared/models/statistic';

@Injectable()
export class StatisticsService {
  constructor(private readonly http: HttpClient) {}

  getStatisticsByUserId(userId: string): Observable<Statistic[]> {
    return this.http
      .get<StatisticApiResponse[]>(`http://localhost:3000/stats/${userId}`)
      .pipe(map(response => toStatistics(response)));
  }
}
