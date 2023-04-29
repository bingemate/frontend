import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreatePlaylistApiRequest,
  Playlist,
  PlaylistItem,
  PlaylistItemsApiResponse,
  PlaylistsApiResponse,
  toPlaylistItems, toPlaylists
} from "../../shared/models/playlist.model";

@Injectable()
export class PlaylistsService {
  constructor(private readonly http: HttpClient) {}

  getPlaylistItems(playlistId: string): Observable<PlaylistItem[]> {
    return this.http
      .get<PlaylistItemsApiResponse>(`http://localhost:3000/playlist/${playlistId}`)
      .pipe(map(response => toPlaylistItems(response)));
  }

  getPlaylists(userId: string): Observable<Playlist[]> {
    return this.http
      .get<PlaylistsApiResponse>(`http://localhost:3000/playlist/user/${userId}`)
      .pipe(map(response => toPlaylists(response)));
  }

  createPlaylist(createPlaylist: CreatePlaylistApiRequest): Observable<string> {
    return this.http
      .post<string>("https://jsonplaceholder.typicode.com/albums", createPlaylist);
  }
}
