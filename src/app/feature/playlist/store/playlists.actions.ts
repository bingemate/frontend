import { CreatePlaylistApiRequest } from '../../../shared/models/playlist.model';

export namespace PlaylistsActions {
  export class GetUserPlaylists {
    static readonly type = '[Playlists] Get User Playlists';
    constructor(public userId: string) {}
  }
  export class DeletePlaylist {
    static readonly type = '[Playlists] Delete Playlist';
    constructor(public playlistId: string) {}
  }
  export class CreatePlaylist {
    static readonly type = '[Playlists] Create Playlist';
    constructor(public createPlaylistApiRequest: CreatePlaylistApiRequest) {}
  }
}
