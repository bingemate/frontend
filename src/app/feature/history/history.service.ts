import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  HistoryAPIResponse,
  HistoryModel,
  toHistories,
} from '../../shared/models/history.models';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private readonly http: HttpClient) {}

  getHistory(): Observable<HistoryModel[]> {
    return this.http
      .get<HistoryAPIResponse>(`${API_RESOURCE_URI.WATCH_SERVICE}/history`)
      .pipe(map(response => toHistories(response)));
  }

  deleteHistory(mediaId: number): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/history/${mediaId}`
    );
  }
}
