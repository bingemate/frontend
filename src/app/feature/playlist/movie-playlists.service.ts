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

@Injectable()
export class MoviePlaylistsService {
  constructor(private readonly http: HttpClient) {}

  getPlaylistById(playlistId: string): Observable<MoviePlaylist> {
    return this.http
      .get<MoviePlaylistApiResponse>(
        `http://localhost:3000/playlist/${playlistId}`
      )
      .pipe(map(response => toMoviePlaylist(response)));
  }

  getMoviePlaylists(userId: string): Observable<MoviePlaylist[]> {
    return this.http
      .get<MoviePlaylistsApiResponse>(
        `http://localhost:3000/playlist/user/${userId}`
      )
      .pipe(map(response => toMoviePlaylists(response)));
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
    createPlaylist: CreateMoviePlaylistApiRequest
  ): Observable<string> {
    return this.http
      .post<MoviePlaylistIdDto>(
        `http://localhost:3000/playlist`,
        createPlaylist
      )
      .pipe(map(idDto => idDto.id));
  }

  updatePlaylistOrder(
    playlistId: string,
    playlistItems: UpdateMoviePlaylistOrderApiRequest
  ): Observable<void> {
    return this.http.put<void>(
      `http://localhost:3000/playlist/${playlistId}`,
      playlistItems
    );
  }

  addToPlaylist(playlistId: string, request: AddPlaylistMovieRequest) {
    return this.http.patch<void>(
      `http://localhost:3000/playlist/${playlistId}`,
      request
    );
  }
}
