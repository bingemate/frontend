import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  EpisodeHistoryAPIResponse,
  EpisodeHistoryListAPIResponse,
  toEpisodeHistory,
  toEpisodeHistoryList,
} from '../../shared/models/episode-history.models';
import { HistoryModel } from '../../shared/models/history.models';

@Injectable({
  providedIn: 'root',
})
export class EpisodeHistoryService {
  constructor(private readonly http: HttpClient) {}

  getEpisodesHistory(): Observable<HistoryModel[]> {
    return this.http
      .get<EpisodeHistoryListAPIResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/episode-history`
      )
      .pipe(map(response => toEpisodeHistoryList(response)));
  }

  deleteEpisodeHistory(mediaId: number): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/episode-history/${mediaId}`
    );
  }

  getEpisodeHistoryById(episodeId: number): Observable<HistoryModel> {
    return this.http
      .get<EpisodeHistoryAPIResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/episode-history/${episodeId}`
      )
      .pipe(map(response => toEpisodeHistory(response)));
  }
}
