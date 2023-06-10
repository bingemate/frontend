export interface EpisodePlaylistItemMedia {
  playlistItem: EpisodePlaylistItem;
  media: {
    name: string;
    episode: number;
    season: number;
    imageUrl: string;
  };
}

export interface EpisodePlaylist {
  id: string;
  name: string;
  userId: string;
  items: EpisodePlaylistItem[];
}

export interface EpisodePlaylistItem {
  episodeId: number;
}

export interface EpisodePlaylistsApiResponse {
  items: EpisodePlaylistApiResponse[];
}

export interface EpisodePlaylistApiResponse {
  id: string;
  name: string;
  userId: string;
  items: EpisodePlaylistItemApiResponse[];
}

export interface PlaylistItemsApiResponse {
  items: EpisodePlaylistItemApiResponse[];
}

export interface EpisodePlaylistItemApiResponse {
  episodeId: number;
}

export interface CreateEpisodePlaylistApiRequest {
  name: string;
}

export interface UpdateEpisodePlaylistOrderApiRequest {
  items: EpisodePlaylistItem[];
}

export interface EpisodePlaylistIdDto {
  id: string;
}
export interface AddPlaylistEpisodeRequest {
  episodeId: number;
}

export function toEpisodePlaylists(
  playlist: EpisodePlaylistsApiResponse
): EpisodePlaylist[] {
  return playlist.items.map(toEpisodePlaylist);
}

export function toEpisodePlaylist(
  playlistItem: EpisodePlaylistApiResponse
): EpisodePlaylist {
  return {
    id: playlistItem.id,
    name: playlistItem.name,
    userId: playlistItem.userId,
    items: toEpisodePlaylistItems(playlistItem),
  };
}

export function toEpisodePlaylistItems(
  playlist: PlaylistItemsApiResponse
): EpisodePlaylistItem[] {
  return playlist.items.map(toEpisodePlaylistItem);
}

export function toEpisodePlaylistItem(
  playlistItem: EpisodePlaylistItemApiResponse
): EpisodePlaylistItem {
  return {
    episodeId: playlistItem.episodeId,
  };
}
