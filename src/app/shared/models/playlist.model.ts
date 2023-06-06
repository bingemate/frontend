export interface PlaylistStateModel {
  playlists: Playlist[];
}
export enum PlaylistType {
  MOVIE = 'MOVIE',
  EPISODE = 'EPISODE',
}

export interface Playlist {
  id: string;
  name: string;
  userId: string;
  type: PlaylistType;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  mediaId: number;
  season: number;
  episode: number;
}

export interface PlaylistsApiResponse {
  items: PlaylistApiResponse[];
}

export interface PlaylistApiResponse {
  id: string;
  name: string;
  userId: string;
  type: PlaylistType;
  items: PlaylistItemApiResponse[];
}

export interface PlaylistItemsApiResponse {
  items: PlaylistItemApiResponse[];
}

export interface PlaylistItemApiResponse {
  mediaId: number;
  season: number;
  episode: number;
}

export interface CreatePlaylistApiRequest {
  name: string;
  type: PlaylistType;
}

export interface UpdatePlaylistOrderApiRequest {
  items: PlaylistItem[];
}

export interface PlaylistIdDto {
  id: string;
}
export interface AddMediaRequest {
  mediaId: number;
  season?: number;
  episode?: number;
}

export function toPlaylists(playlist: PlaylistsApiResponse): Playlist[] {
  return playlist.items.map(toPlaylist);
}

export function toPlaylist(playlistItem: PlaylistApiResponse): Playlist {
  return {
    id: playlistItem.id,
    name: playlistItem.name,
    userId: playlistItem.userId,
    type: playlistItem.type,
    items: toPlaylistItems(playlistItem),
  };
}

export function toPlaylistItems(
  playlist: PlaylistItemsApiResponse
): PlaylistItem[] {
  return playlist.items.map(toPlaylistItem);
}

export function toPlaylistItem(
  playlistItem: PlaylistItemApiResponse
): PlaylistItem {
  return {
    mediaId: playlistItem.mediaId,
    season: playlistItem.season,
    episode: playlistItem.episode,
  };
}
