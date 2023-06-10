import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  AddPlaylistEpisodeRequest,
  CreateEpisodePlaylistApiRequest,
  EpisodePlaylist,
  EpisodePlaylistApiResponse,
  EpisodePlaylistIdDto,
  EpisodePlaylistsApiResponse,
  toEpisodePlaylist,
  toEpisodePlaylists,
  UpdateEpisodePlaylistOrderApiRequest,
} from '../../shared/models/episode-playlist.model';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable()
export class EpisodePlaylistsService {
  constructor(private readonly http: HttpClient) {}

  getPlaylistById(playlistId: string): Observable<EpisodePlaylist> {
    return this.http
      .get<EpisodePlaylistApiResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/episode-playlist/${playlistId}`
      )
      .pipe(map(response => toEpisodePlaylist(response)));
  }

  getEpisodePlaylists(userId: string): Observable<EpisodePlaylist[]> {
    return this.http
      .get<EpisodePlaylistsApiResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/episode-playlist/user/${userId}`
      )
      .pipe(map(response => toEpisodePlaylists(response)));
  }

  deletePlaylist(playlistId: string): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/episode-playlist/${playlistId}`
    );
  }

  deletePlaylistMedia(playlistId: string, mediaId: number): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/episode-playlist/${playlistId}/${mediaId}`
    );
  }

  createPlaylist(
    createPlaylist: CreateEpisodePlaylistApiRequest
  ): Observable<string> {
    return this.http
      .post<EpisodePlaylistIdDto>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/episode-playlist`,
        createPlaylist
      )
      .pipe(map(idDto => idDto.id));
  }

  updatePlaylistOrder(
    playlistId: string,
    playlistItems: UpdateEpisodePlaylistOrderApiRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/episode-playlist/${playlistId}`,
      playlistItems
    );
  }

  addToPlaylist(playlistId: string, request: AddPlaylistEpisodeRequest) {
    return this.http.patch<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/episode-playlist/${playlistId}`,
      request
    );
  }
}
