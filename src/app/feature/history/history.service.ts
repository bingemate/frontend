import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HistoryAPIResponse, HistoryModel, toHistories } from '../../shared/models/history.models';

@Injectable()
export class HistoryService {
  constructor(private readonly http: HttpClient) {}

  getHistory(): Observable<HistoryModel[]> {
    return this.http
      .get<HistoryAPIResponse>(`${environment.apiUrl}/watch-service/history`)
      .pipe(map(response => toHistories(response)));
  }

  deleteHistory(mediaId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/watch-service/history/${mediaId}`
    );
  }
}
