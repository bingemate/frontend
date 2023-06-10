import { EpisodePlaylist } from './episode-playlist.model';
import { MoviePlaylist } from './movie-playlist.model';

export interface PlaylistStateModel {
  episodePlaylists: EpisodePlaylist[];
  moviePlaylists: MoviePlaylist[];
}
