import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { WatchlistService } from '../../../watchlist/watchlist.service';
import {
  WatchListStatus,
  WatchListType,
} from '../../../../shared/models/watchlist.models';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.less'],
})
export class MovieInfoComponent implements OnInit, OnChanges {
  readonly streamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;
  readonly moviesByGenrePath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_genre.path}/`;
  readonly moviesByActorPath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_actor.path}/`;
  readonly moviesByStudioPath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_studio.path}/`;
  readonly statusNames = Object.values(WatchListStatus);
  readonly statusMap = {
    WATCHING: 'En cours',
    PLAN_TO_WATCH: 'Prévu',
    FINISHED: 'Terminé',
    ABANDONED: 'Abandonné',
  };

  @Select(PlaylistState.moviePlaylists)
  playlists$!: Observable<Playlist[]>;
  @Input() movie: MovieResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;
  isMediaInWatchList = true;

  constructor(
    private readonly store: Store,
    private playlistsService: PlaylistsService,
    private readonly notificationsService: NotificationsService,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new PlaylistActions.GetCurrentUserPlaylists());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['movie'].currentValue &&
      changes['movie'].currentValue !== changes['movie'].previousValue &&
      this.movie
    ) {
      this.watchlistService.getWatchlistItem(this.movie.id).subscribe(item => {
        console.log(item);
        if (!item) {
          this.isMediaInWatchList = false;
        }
      });
    }
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
          this.notificationsService.success('Film ajouté à la playlist')
        );
    }
  }

  addToWatchlist(status: WatchListStatus) {
    if (this.movie) {
      this.watchlistService
        .createWatchlistItem({
          status,
          mediaId: this.movie.id,
          mediaType: WatchListType.MOVIE,
        })
        .subscribe(() => {
          this.notificationsService.info(
            'Le film a été ajouté aux films suivis'
          );
          this.isMediaInWatchList = true;
        });
    }
  }
}
