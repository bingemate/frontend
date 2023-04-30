import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Playlist } from '../../../shared/models/playlist.model';
import { PlaylistsState } from '../../../feature/playlist/store/playlists.state';
import { PlaylistsActions } from '../../../feature/playlist/store/playlists.actions';
import { AuthState } from '../../../core/auth/store/auth.state';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less'],
})
export class PlaylistsComponent implements OnInit {
  @Select(PlaylistsState.playlists) playlists$!: Observable<Playlist[]>;

  isPlaylistShown = false;
  isConfirmLoading = false;
  playlistName: string | undefined;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    this.store.dispatch(new PlaylistsActions.GetUserPlaylists(userId!));
  }

  showModal(): void {
    this.isPlaylistShown = true;
  }

  closeModal() {
    this.isPlaylistShown = false;
    this.playlistName = undefined;
    this.isConfirmLoading = false;
  }

  createPlaylist() {
    this.isConfirmLoading = true;
    this.store
      .dispatch(
        new PlaylistsActions.CreatePlaylist({ name: this.playlistName! })
      )
      .subscribe(() => {
        this.closeModal();
      });
  }

  deletePlaylist(id: string) {
    this.store.dispatch(new PlaylistsActions.DeletePlaylist(id));
  }
}
