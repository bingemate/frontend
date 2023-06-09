import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  AddPlaylistMovieRequest,
  CreateMoviePlaylistApiRequest,
  MoviePlaylist,
  MoviePlaylistApiResponse,
  MoviePlaylistIdDto,
  MoviePlaylistsApiResponse,
  toMoviePlaylist,
  toMoviePlaylists,
  UpdateMoviePlaylistOrderApiRequest,
} from '../../shared/models/movie-playlist.model';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable()
export class MoviePlaylistsService {
  constructor(private readonly http: HttpClient) {}

  getPlaylistById(playlistId: string): Observable<MoviePlaylist> {
    return this.http
      .get<MoviePlaylistApiResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/movie-playlist/${playlistId}`
      )
      .pipe(map(response => toMoviePlaylist(response)));
  }

  getMoviePlaylists(userId: string): Observable<MoviePlaylist[]> {
    return this.http
      .get<MoviePlaylistsApiResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/movie-playlist/user/${userId}`
      )
      .pipe(map(response => toMoviePlaylists(response)));
  }

  deletePlaylist(playlistId: string): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-playlist/${playlistId}`
    );
  }

  deletePlaylistMedia(playlistId: string, mediaId: number): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-playlist/${playlistId}/${mediaId}`
    );
  }

  createPlaylist(
    createPlaylist: CreateMoviePlaylistApiRequest
  ): Observable<string> {
    return this.http
      .post<MoviePlaylistIdDto>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/movie-playlist`,
        createPlaylist
      )
      .pipe(map(idDto => idDto.id));
  }

  updatePlaylistOrder(
    playlistId: string,
    playlistItems: UpdateMoviePlaylistOrderApiRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-playlist/${playlistId}`,
      playlistItems
    );
  }

  addToPlaylist(playlistId: string, request: AddPlaylistMovieRequest) {
    return this.http.patch<void>(
      `${API_RESOURCE_URI.WATCH_SERVICE}/movie-playlist/${playlistId}`,
      request
    );
  }
}
