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

@Injectable()
export class EpisodePlaylistsService {
  constructor(private readonly http: HttpClient) {}

  getPlaylistById(playlistId: string): Observable<EpisodePlaylist> {
    return this.http
      .get<EpisodePlaylistApiResponse>(
        `http://localhost:3000/playlist/${playlistId}`
      )
      .pipe(map(response => toEpisodePlaylist(response)));
  }

  getEpisodePlaylists(userId: string): Observable<EpisodePlaylist[]> {
    return this.http
      .get<EpisodePlaylistsApiResponse>(
        `http://localhost:3000/playlist/user/${userId}`
      )
      .pipe(map(response => toEpisodePlaylists(response)));
  }

  deletePlaylist(playlistId: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3000/playlist/${playlistId}`
    );
  }

  deletePlaylistMedia(playlistId: string, mediaId: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3000/playlist/${playlistId}/${mediaId}`
    );
  }

  createPlaylist(
    createPlaylist: CreateEpisodePlaylistApiRequest
  ): Observable<string> {
    return this.http
      .post<EpisodePlaylistIdDto>(
        `http://localhost:3000/playlist`,
        createPlaylist
      )
      .pipe(map(idDto => idDto.id));
  }

  updatePlaylistOrder(
    playlistId: string,
    playlistItems: UpdateEpisodePlaylistOrderApiRequest
  ): Observable<void> {
    return this.http.put<void>(
      `http://localhost:3000/playlist/${playlistId}`,
      playlistItems
    );
  }

  addToPlaylist(playlistId: string, request: AddPlaylistEpisodeRequest) {
    return this.http.patch<void>(
      `http://localhost:3000/playlist/${playlistId}`,
      request
    );
  }
}
