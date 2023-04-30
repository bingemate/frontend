import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreatePlaylistApiRequest,
  Playlist, PlaylistIdDto,
  PlaylistItem,
  PlaylistItemsApiResponse,
  PlaylistsApiResponse,
  toPlaylistItems,
  toPlaylists, UpdatePlaylistOrderApiRequest
} from "../../shared/models/playlist.model";
import { environment } from '../../../environments/environment';

@Injectable()
export class PlaylistsService {
  constructor(private readonly http: HttpClient) {}

  getPlaylistItems(playlistId: string): Observable<PlaylistItem[]> {
    return this.http
      .get<PlaylistItemsApiResponse>(
        `${environment.apiUrl}/playlist/${playlistId}`
      )
      .pipe(map(response => toPlaylistItems(response)));
  }

  getPlaylists(userId: string): Observable<Playlist[]> {
    return this.http
      .get<PlaylistsApiResponse>(
        `${environment.apiUrl}/playlist/user/${userId}`
      )
      .pipe(map(response => toPlaylists(response)));
  }

  deletePlaylist(playlistId: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/playlist/${playlistId}`
    );
  }

  createPlaylist(createPlaylist: CreatePlaylistApiRequest): Observable<PlaylistIdDto> {
    return this.http.post<PlaylistIdDto>(
      `${environment.apiUrl}/playlist`,
      createPlaylist
    );
  }

  updatePlaylistOrder(playlistId: string, playlistItems: UpdatePlaylistOrderApiRequest): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/playlist/${playlistId}`,
      playlistItems
    );
  }
}
