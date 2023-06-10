import { Component, OnInit } from '@angular/core';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { TvShowWatchlistService } from '../../../feature/watchlist/tv-show-watchlist.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Store } from '@ngxs/store';
import { forkJoin, map, mergeMap } from 'rxjs';
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

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.less'],
})
export class WatchlistComponent implements OnInit {
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
  showWatchlist: { media: TvShowResponse; watchlist: TvShowWatchlistItem }[] =
    [];

  constructor(
    private readonly store: Store,
    private readonly mediaService: MediaInfoService,
    private tvShowWatchlistService: TvShowWatchlistService,
    private movieWatchlistService: MovieWatchlistService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (userId) {
      this.tvShowWatchlistService
        .getWatchlistByUserId(userId)
        .pipe(
          mergeMap(watchlist =>
            forkJoin(
              watchlist.map(item =>
                this.mediaService
                  .getTvShowInfo(item.tvShowId)
                  .pipe(map(media => ({ media, watchlist: item })))
              )
            )
          )
        )
        .subscribe(watchlist => {
          this.showWatchlist = watchlist;
        });
      this.movieWatchlistService
        .getWatchlistByUserId(userId)
        .pipe(
          mergeMap(watchlist =>
            forkJoin(
              watchlist.map(item =>
                this.mediaService
                  .getMovieInfo(item.movieId)
                  .pipe(map(media => ({ media, watchlist: item })))
              )
            )
          )
        )
        .subscribe(watchlist => {
          this.movieWatchlist = watchlist;
        });
    }
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

  protected readonly movieViewPath = movieViewPath;
  protected readonly tvShowViewPath = tvShowViewPath;
}
