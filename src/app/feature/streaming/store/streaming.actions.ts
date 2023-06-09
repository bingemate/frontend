import { MoviePlaylist } from '../../../shared/models/movie-playlist.model';

export namespace StreamingActions {
  export class WatchPlaylist {
    static readonly type = '[Streaming] Watch Playlist';
    constructor(public playlist: MoviePlaylist, public position: number) {}
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
