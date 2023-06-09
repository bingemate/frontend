import { MoviePlaylist } from '../../../shared/models/movie-playlist.model';
import { EpisodePlaylist } from '../../../shared/models/episode-playlist.model';

export namespace StreamingActions {
  export class WatchMoviePlaylist {
    static readonly type = '[Streaming] Watch Movie Playlist';
    constructor(public playlist: MoviePlaylist, public position: number) {}
  }
  export class WatchEpisodePlaylist {
    static readonly type = '[Streaming] Watch Episode Playlist';
    constructor(public playlist: EpisodePlaylist, public position: number) {}
  }
  export class SeekMediaPlaylist {
    static readonly type = '[Streaming] Playlist Seek Media';
    constructor(public position: number) {}
  }
  export class MediaEndedPlaylist {
    static readonly type = '[Streaming] Playlist Media Ended';
  }
  export class AutoplayToggle {
    static readonly type = '[Streaming] Toggle Autoplay';
    constructor(public autoplay: boolean) {}
  }
}
