import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreatePlaylistApiRequest,
  Playlist,
  PlaylistIdDto,
  PlaylistItem,
  PlaylistItemsApiResponse,
  PlaylistsApiResponse,
  toPlaylistItems,
  toPlaylists,
  UpdatePlaylistOrderApiRequest,
} from '../../shared/models/playlist.model';
import { environment } from '../../../environments/environment';
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
      .get<StatisticApiResponse[]>(
        `${environment.apiUrl}/watch-service/stats/${userId}`
      )
      .pipe(map(response => toStatistics(response)));
  }
}
