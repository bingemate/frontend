import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { MoviePlaylistsService } from '../../../feature/playlist/movie-playlists.service';
import { EpisodePlaylist } from '../../../shared/models/episode-playlist.model';
import { MoviePlaylist } from '../../../shared/models/movie-playlist.model';
import { EpisodePlaylistsService } from '../../../feature/playlist/episode-playlists.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../shared/models/user.models';
import { NotificationsService } from '../../../core/notifications/notifications.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  episodePlaylists: EpisodePlaylist[] = [];
  moviePlaylists: MoviePlaylist[] = [];
  episodePlaylistLoading = false;
  moviePlaylistLoading = false;

  query = '';
  filter = '';
  queryTimeout = 0;

  isPlaylistShown = false;
  isConfirmLoading = false;
  playlistName?: string;
  playlistType?: 'MOVIE' | 'EPISODE';

  @Select(AuthState.user) user$!: Observable<UserResponse | null>;

  constructor(
    private readonly store: Store,
    private readonly moviePlaylistsService: MoviePlaylistsService,
    private readonly episodePlaylistsService: EpisodePlaylistsService,
    private readonly notificationsService: NotificationsService
  ) {}

  onQuery() {
    clearTimeout(this.queryTimeout);
    this.queryTimeout = setTimeout(() => {
      this.filter = this.query;
    }, 300);
  }

  ngOnDestroy(): void {
    clearTimeout(this.queryTimeout);
  }

  filteredMoviePlaylists(): MoviePlaylist[] {
    return this.moviePlaylists.filter(playlist =>
      playlist.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  filteredEpisodePlaylists(): EpisodePlaylist[] {
    return this.episodePlaylists.filter(playlist =>
      playlist.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

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
      error: err => {
        this.notificationsService.error(
          "Erreur lors du chargement des playlists d'épisodes",
          err.error
        );
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
      error: err => {
        this.notificationsService.error(
          'Erreur lors du chargement des playlists de films',
          err.error
        );
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
      this.moviePlaylistsService.createPlaylist({ name }).subscribe({
        next: id => {
          this.moviePlaylists.push({
            id: id,
            name,
            userId: '',
            items: [],
          });
          this.closeModal();
          this.notificationsService.success('Playlist créée');
        },
        error: err => {
          this.notificationsService.error(
            'Erreur lors de la création de la playlist',
            err.error
          );
        },
      });
    } else {
      this.episodePlaylistsService.createPlaylist({ name }).subscribe({
        next: id => {
          this.notificationsService.success('Playlist créée');
          this.episodePlaylists.push({
            id: id,
            name,
            userId: '',
            items: [],
          });
          this.closeModal();
        },
        error: err => {
          this.notificationsService.error(
            'Erreur lors de la création de la playlist',
            err.error
          );
        },
      });
    }
  }

  deleteMoviePlaylist(playlistId: string) {
    this.moviePlaylistsService.deletePlaylist(playlistId).subscribe({
      next: () => {
        this.notificationsService.success('Playlist supprimée');
        this.moviePlaylists = this.moviePlaylists.filter(
          playlist => playlist.id !== playlistId
        );
      },
      error: err => {
        this.notificationsService.error(
          'Erreur lors de la suppression de la playlist',
          err.error
        );
      },
    });
  }

  deleteEpisodePlaylist(playlistId: string) {
    this.episodePlaylistsService.deletePlaylist(playlistId).subscribe({
      next: () => {
        this.notificationsService.success('Playlist supprimée');
        this.episodePlaylists = this.episodePlaylists.filter(
          playlist => playlist.id !== playlistId
        );
      },
      error: err => {
        this.notificationsService.error(
          'Erreur lors de la suppression de la playlist',
          err.error
        );
      },
    });
  }
}
