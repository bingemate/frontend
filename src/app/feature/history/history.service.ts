import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  HistoryAPIResponse,
  HistoryModel,
  toHistories,
} from '../../shared/models/history.models';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private readonly http: HttpClient) {}

  getHistory(): Observable<HistoryModel[]> {
    return this.http
      .get<HistoryAPIResponse>(`http://localhost:3000/history`)
      .pipe(map(response => toHistories(response)));
  }

  deleteHistory(mediaId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/history/${mediaId}`);
  }
}
