import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { MoviePlaylistsService } from '../../../feature/playlist/movie-playlists.service';
import { EpisodePlaylist } from '../../../shared/models/episode-playlist.model';
import { MoviePlaylist } from '../../../shared/models/movie-playlist.model';
import { EpisodePlaylistsService } from '../../../feature/playlist/episode-playlists.service';
import { StreamingActions } from '../../../feature/streaming/store/streaming.actions';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less'],
})
export class PlaylistsComponent implements OnInit {
  episodePlaylists: EpisodePlaylist[] = [];
  moviePlaylists: MoviePlaylist[] = [];
  isPlaylistShown = false;
  isConfirmLoading = false;
  playlistName?: string;
  playlistType?: 'MOVIE' | 'EPISODE';

  constructor(
    private readonly store: Store,
    private readonly moviePlaylistsService: MoviePlaylistsService,
    private readonly episodePlaylistsService: EpisodePlaylistsService
  ) {}

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (!userId) {
      return;
    }
    this.moviePlaylistsService
      .getMoviePlaylists(userId)
      .subscribe(playlists => {
        this.moviePlaylists = playlists;
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
    if (type === 'MOVIE') {
      this.moviePlaylistsService.createPlaylist({ name }).subscribe(id => {
        this.moviePlaylists.push({
          id: id,
          name,
          userId: '',
          items: [],
        });
        this.closeModal();
      });
    } else {
      this.episodePlaylistsService.createPlaylist({ name }).subscribe(id => {
        this.moviePlaylists.push({
          id: id,
          name,
          userId: '',
          items: [],
        });
        this.closeModal();
      });
    }
  }

  deletePlaylist(playlistId: string) {
    this.moviePlaylistsService.deletePlaylist(playlistId).subscribe(() => {
      this.moviePlaylists = this.moviePlaylists.filter(
        playlist => playlist.id !== playlistId
      );
    });
  }

  watchMoviePlaylist(index: number) {
    this.store.dispatch(
      new StreamingActions.WatchPlaylist(this.moviePlaylists[index], 0)
    );
  }
}
