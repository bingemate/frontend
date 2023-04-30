export interface PlaylistStateModel {
  playlists: Playlist[];
}

export interface Playlist {
  id: string;
  name: string;
  userId: string;
  items?: PlaylistItem[];
}

export interface PlaylistItem {
  mediaId: string;
}

export interface PlaylistsApiResponse {
  items: PlaylistApiResponse[];
}

export interface PlaylistApiResponse {
  id: string;
  name: string;
  userId: string;
}

export interface PlaylistItemsApiResponse {
  items: PlaylistItemApiResponse[];
}

export interface PlaylistItemApiResponse {
  mediaId: string;
}

export interface CreatePlaylistApiRequest {
  name: string;
}

export interface PlaylistIdDto {
  id: string;
}

export function toPlaylists(playlist: PlaylistsApiResponse): Playlist[] {
  return playlist.items.map(toPlaylist);
}

export function toPlaylist(playlistItem: PlaylistApiResponse): Playlist {
  return {
    id: playlistItem.id,
    name: playlistItem.name,
    userId: playlistItem.userId,
  };
}

export function toPlaylistItems(playlist: PlaylistItemsApiResponse): PlaylistItem[] {
  return playlist.items.map(toPlaylistItem);
}

export function toPlaylistItem(playlistItem: PlaylistItemApiResponse): PlaylistItem {
  return {
    mediaId: playlistItem.mediaId,
  };
}
