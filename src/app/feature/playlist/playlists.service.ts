import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreatePlaylistApiRequest,
  Playlist,
  PlaylistApiResponse,
  PlaylistIdDto,
  PlaylistsApiResponse,
  toPlaylist,
  toPlaylists,
  UpdatePlaylistOrderApiRequest,
} from '../../shared/models/playlist.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class PlaylistsService {
  constructor(private readonly http: HttpClient) {}

  getPlaylistById(playlistId: string): Observable<Playlist> {
    return this.http
      .get<PlaylistApiResponse>(
        `${environment.apiUrl}/watch-service/playlist/${playlistId}`
      )
      .pipe(map(response => toPlaylist(response)));
  }

  getPlaylists(userId: string): Observable<Playlist[]> {
    return this.http
      .get<PlaylistsApiResponse>(
        `${environment.apiUrl}/watch-service/playlist/user/${userId}`
      )
      .pipe(map(response => toPlaylists(response)));
  }

  deletePlaylist(playlistId: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/watch-service/playlist/${playlistId}`
    );
  }

  deletePlaylistMedia(playlistId: string, mediaId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/watch-service/playlist/${playlistId}/${mediaId}`
    );
  }

  createPlaylist(
    createPlaylist: CreatePlaylistApiRequest
  ): Observable<PlaylistIdDto> {
    return this.http.post<PlaylistIdDto>(
      `${environment.apiUrl}/watch-service/playlist`,
      createPlaylist
    );
  }

  updatePlaylistOrder(
    playlistId: string,
    playlistItems: UpdatePlaylistOrderApiRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/playlist/${playlistId}`,
      playlistItems
    );
  }
}
