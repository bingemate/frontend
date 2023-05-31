import { Component, Input, OnInit } from '@angular/core';
import { MovieResponse, Person } from '../../../../shared/models/media.models';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { mediasLinks } from '../../../../pages/medias/medias-routing.module';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Playlist } from '../../../../shared/models/playlist.model';
import { PlaylistState } from '../../../playlist/store/playlist.state';
import { PlaylistActions } from '../../../playlist/store/playlist.actions';
import { PlaylistsService } from '../../../playlist/playlists.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.less'],
})
export class MovieInfoComponent implements OnInit {
  readonly streamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;
  readonly moviesByGenrePath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_genre.path}/`;
  readonly moviesByActorPath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_actor.path}/`;
  readonly moviesByStudioPath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_studio.path}/`;

  @Select(PlaylistState.moviePlaylists)
  playlists$!: Observable<Playlist[]>;
  @Input() movie: MovieResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;

  constructor(
    private readonly store: Store,
    private playlistsService: PlaylistsService,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new PlaylistActions.GetCurrentUserPlaylists());
  }

  getRate(): number {
    return Math.round(this.movie?.voteAverage ?? 0) / 2;
  }

  getActorsSlice(): Person[] {
    const start = (this.actorsCurrentPage - 1) * this.actorsPageSize;
    const end = start + this.actorsPageSize;
    return this.movie?.actors.slice(start, end) ?? [];
  }

  onActorsPageChange(page: number): void {
    this.actorsCurrentPage = page;
  }

  addToPlaylist(playlistId: string) {
    if (this.movie) {
      this.playlistsService
        .addToPlaylist(playlistId, {
          mediaId: this.movie.id,
        })
        .subscribe(() =>
          this.notificationsService.info('Episode ajouté à la playlist')
        );
    }
  }
}
