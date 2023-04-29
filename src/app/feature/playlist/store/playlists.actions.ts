import { CreatePlaylistApiRequest } from "../../../shared/models/playlist.model";

export namespace PlaylistsActions {
  export class GetUserPlaylists {
    static readonly type = '[Playlists] Get User Playlists';
  }
  export class DeletePlaylist {
    static readonly type = '[Playlists] Delete Playlist';
  }
  export class CreatePlaylist {
    static readonly type = '[Playlists] Create Playlist';
    constructor(public payload: CreatePlaylistApiRequest) {}
  }
}
