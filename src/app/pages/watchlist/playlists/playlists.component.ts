import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { MoviePlaylistsService } from '../../../feature/playlist/movie-playlists.service';
import { EpisodePlaylist } from '../../../shared/models/episode-playlist.model';
import { MoviePlaylist } from '../../../shared/models/movie-playlist.model';
import { EpisodePlaylistsService } from '../../../feature/playlist/episode-playlists.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../shared/models/user.models';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less'],
})
export class PlaylistsComponent implements OnInit {
  episodePlaylists: EpisodePlaylist[] = [];
  moviePlaylists: MoviePlaylist[] = [];
  episodePlaylistLoading = false;
  moviePlaylistLoading = false;

  isPlaylistShown = false;
  isConfirmLoading = false;
  playlistName?: string;
  playlistType?: 'MOVIE' | 'EPISODE';

  @Select(AuthState.user) user$!: Observable<UserResponse | null>;

  constructor(
    private readonly store: Store,
    private readonly moviePlaylistsService: MoviePlaylistsService,
    private readonly episodePlaylistsService: EpisodePlaylistsService
  ) {}

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.loadMoviePlaylists(user);
        this.loadEpisodePlaylists(user);
      }
    });
  }

  private loadEpisodePlaylists(user: UserResponse) {
    this.episodePlaylistLoading = true;
    this.episodePlaylistsService.getEpisodePlaylists(user.id).subscribe({
      next: playlists => {
        this.episodePlaylists = playlists;
      },
      complete: () => {
        this.episodePlaylistLoading = false;
      },
    });
  }

  private loadMoviePlaylists(user: UserResponse) {
    this.moviePlaylistLoading = true;
    this.moviePlaylistsService.getMoviePlaylists(user.id).subscribe({
      next: playlists => {
        this.moviePlaylists = playlists;
      },
      complete: () => {
        this.moviePlaylistLoading = false;
      },
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
        this.episodePlaylists.push({
          id: id,
          name,
          userId: '',
          items: [],
        });
        this.closeModal();
      });
    }
  }

  deleteMoviePlaylist(playlistId: string) {
    this.moviePlaylistsService.deletePlaylist(playlistId).subscribe(() => {
      this.moviePlaylists = this.moviePlaylists.filter(
        playlist => playlist.id !== playlistId
      );
    });
  }

  deleteEpisodePlaylist(playlistId: string) {
    this.episodePlaylistsService.deletePlaylist(playlistId).subscribe(() => {
      this.episodePlaylists = this.episodePlaylists.filter(
        playlist => playlist.id !== playlistId
      );
    });
  }
}
