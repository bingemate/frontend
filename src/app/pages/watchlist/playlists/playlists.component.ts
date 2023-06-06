import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Playlist, PlaylistType } from '../../../shared/models/playlist.model';
import { AuthState } from '../../../core/auth/store/auth.state';
import { StreamingActions } from '../../../feature/streaming/store/streaming.actions';
import { PlaylistsService } from '../../../feature/playlist/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less'],
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  isPlaylistShown = false;
  isConfirmLoading = false;
  playlistName?: string;
  playlistType?: PlaylistType;

  constructor(
    private readonly store: Store,
    private readonly playlistsService: PlaylistsService
  ) {}

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (!userId) {
      return;
    }
    this.playlistsService.getPlaylists(userId).subscribe(playlists => {
      this.playlists = playlists;
    });
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
    if (!this.playlistName || !this.playlistType) {
      return;
    }
    const name = this.playlistName;
    const type = this.playlistType;
    this.isConfirmLoading = true;
    this.playlistsService.createPlaylist({ name, type }).subscribe(id => {
      this.playlists.push({
        id: id,
        name,
        type,
        userId: '',
        items: [],
      });
      this.closeModal();
    });
  }

  deletePlaylist(playlistId: string) {
    this.playlistsService.deletePlaylist(playlistId).subscribe(() => {
      this.playlists = this.playlists.filter(
        playlist => playlist.id !== playlistId
      );
    });
  }

  watchPlaylist(index: number) {
    this.store.dispatch(
      new StreamingActions.WatchPlaylist(this.playlists[index], 0)
    );
  }
}
