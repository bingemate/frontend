import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { TvShowWatchlistService } from '../../../feature/watchlist/tv-show-watchlist.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Select, Store } from '@ngxs/store';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import {
  MovieResponse,
  TvShowResponse,
} from '../../../shared/models/media.models';
import { NotificationsService } from '../../../core/notifications/notifications.service';
import {
  movieViewPath,
  tvShowViewPath,
} from '../../medias/medias-routing.module';
import {
  MovieWatchlistItem,
  MovieWatchListStatus,
} from '../../../shared/models/movie-watchlist.models';
import {
  TvShowWatchlistItem,
  TvShowWatchListStatus,
} from '../../../shared/models/tv-show-watchlist.models';
import { MovieWatchlistService } from '../../../feature/watchlist/movie-watchlist.service';
import { UserResponse } from '../../../shared/models/user.models';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.less'],
})
export class WatchlistComponent implements OnInit, OnDestroy {
  @Select(AuthState.user) user$!: Observable<UserResponse | null>;

  readonly movieStatusNames = Object.values(MovieWatchListStatus);
  readonly tvShowStatusNames = Object.values(TvShowWatchListStatus);

  readonly statusMap = {
    WATCHING: 'En cours',
    PLAN_TO_WATCH: 'Prévu',
    FINISHED: 'Terminé',
    ABANDONED: 'Abandonné',
  };

  movieWatchlist: { media: MovieResponse; watchlist: MovieWatchlistItem }[] =
    [];
  movieWatchlistLoading = false;
  showWatchlist: { media: TvShowResponse; watchlist: TvShowWatchlistItem }[] =
    [];
  showWatchlistLoading = false;

  query = '';
  filter = '';
  queryTimeout = 0;

  constructor(
    private readonly store: Store,
    private readonly mediaService: MediaInfoService,
    private tvShowWatchlistService: TvShowWatchlistService,
    private movieWatchlistService: MovieWatchlistService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.loadTvWatchlist(user);
        this.loadMovieWatchlist(user);
      }
    });
  }

  onQuery() {
    clearTimeout(this.queryTimeout);
    this.queryTimeout = setTimeout(() => {
      this.filter = this.query;
    }, 300);
  }

  private loadMovieWatchlist(user: UserResponse) {
    this.movieWatchlistLoading = true;
    this.movieWatchlistService
      .getWatchlistByUserId(user.id)
      .pipe(
        mergeMap(watchlist =>
          forkJoin(
            watchlist.map(item =>
              this.mediaService
                .getMovieShortInfo(item.movieId)
                .pipe(map(media => ({ media, watchlist: item })))
            )
          )
        )
      )
      .subscribe({
        next: watchlist => {
          this.movieWatchlist = watchlist;
        },
        complete: () => (this.movieWatchlistLoading = false),
      });
  }

  private loadTvWatchlist(user: UserResponse) {
    this.showWatchlistLoading = true;
    this.tvShowWatchlistService
      .getWatchlistByUserId(user.id)
      .pipe(
        mergeMap(watchlist =>
          forkJoin(
            watchlist.map(item =>
              this.mediaService
                .getTvShowShortInfo(item.tvShowId)
                .pipe(map(media => ({ media, watchlist: item })))
            )
          )
        )
      )
      .subscribe({
        next: watchlist => {
          this.showWatchlist = watchlist;
        },
        complete: () => (this.showWatchlistLoading = false),
      });
  }

  getTvListByStatus(status: string) {
    return this.showWatchlist.filter(
      item =>
        item.watchlist.status === status &&
        item.media.title.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  getMovieListByStatus(status: string) {
    return this.movieWatchlist.filter(
      item =>
        item.watchlist.status === status &&
        item.media.title.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  changeShowStatus(
    item: { media: TvShowResponse; watchlist: TvShowWatchlistItem },
    status: TvShowWatchListStatus
  ) {
    item.watchlist.status = status;
    this.tvShowWatchlistService
      .updateWatchlistItem(item.watchlist)
      .subscribe(() =>
        this.notifService.success(
          'Liste de suivie modifié',
          `Suivi ${this.statusMap[status]} pour ${item.media.title}`
        )
      );
  }

  changeMovieStatus(
    item: { media: MovieResponse; watchlist: MovieWatchlistItem },
    status: MovieWatchListStatus
  ) {
    item.watchlist.status = status;
    this.movieWatchlistService
      .updateWatchlistItem(item.watchlist)
      .subscribe(() =>
        this.notifService.success(
          'Liste de suivie modifié',
          `Suivi ${this.statusMap[status]} pour ${item.media.title}`
        )
      );
  }

  removeMovieWatchlist(item: {
    media: MovieResponse;
    watchlist: MovieWatchlistItem;
  }) {
    this.movieWatchlistService
      .removeFromWatchlist(item.watchlist.movieId)
      .subscribe(() => {
        this.movieWatchlist = this.movieWatchlist.filter(
          wlLtem => item.media.id !== wlLtem.media.id
        );
        this.notifService.success(
          'Liste de suivie modifié',
          `${item.media.title} a été retiré`
        );
      });
  }

  removeShowWatchlist(item: {
    media: TvShowResponse;
    watchlist: TvShowWatchlistItem;
  }) {
    this.tvShowWatchlistService
      .removeFromWatchlist(item.watchlist.tvShowId)
      .subscribe(() => {
        this.showWatchlist = this.showWatchlist.filter(
          wlLtem => item.media.id !== wlLtem.media.id
        );
        this.notifService.success(
          'Liste de suivie modifié',
          `${item.media.title} a été retiré`
        );
      });
  }

  ngOnDestroy(): void {
    clearTimeout(this.queryTimeout);
  }

  protected readonly movieViewPath = movieViewPath;
  protected readonly tvShowViewPath = tvShowViewPath;
}
