export interface MoviePlaylistItemMedia {
  playlistItem: MoviePlaylistItem;
  media: {
    name: string;
    imageUrl: string;
  };
}

export interface MoviePlaylist {
  id: string;
  name: string;
  userId: string;
  items: MoviePlaylistItem[];
}

export interface MoviePlaylistItem {
  movieId: number;
}

export interface MoviePlaylistsApiResponse {
  items: MoviePlaylistApiResponse[];
}

export interface MoviePlaylistApiResponse {
  id: string;
  name: string;
  userId: string;
  items: MoviePlaylistItemApiResponse[];
}

export interface PlaylistItemsApiResponse {
  items: MoviePlaylistItemApiResponse[];
}

export interface MoviePlaylistItemApiResponse {
  MovieId: number;
}

export interface CreateMoviePlaylistApiRequest {
  name: string;
}

export interface UpdateMoviePlaylistOrderApiRequest {
  items: MoviePlaylistItem[];
}

export interface MoviePlaylistIdDto {
  id: string;
}
export interface AddPlaylistMovieRequest {
  movieId: number;
}

export function toMoviePlaylists(
  playlist: MoviePlaylistsApiResponse
): MoviePlaylist[] {
  return playlist.items.map(toMoviePlaylist);
}

export function toMoviePlaylist(
  playlistItem: MoviePlaylistApiResponse
): MoviePlaylist {
  return {
    id: playlistItem.id,
    name: playlistItem.name,
    userId: playlistItem.userId,
    items: toMoviePlaylistItems(playlistItem),
  };
}

export function toMoviePlaylistItems(
  playlist: PlaylistItemsApiResponse
): MoviePlaylistItem[] {
  return playlist.items.map(toMoviePlaylistItem);
}

export function toMoviePlaylistItem(
  playlistItem: MoviePlaylistItemApiResponse
): MoviePlaylistItem {
  return {
    movieId: playlistItem.MovieId,
  };
}
