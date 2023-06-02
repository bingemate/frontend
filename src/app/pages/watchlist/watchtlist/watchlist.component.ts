import { Component, OnInit } from '@angular/core';
import { WatchlistItem, WatchListStatus, WatchListType } from '../../../shared/models/watchlist.models';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { WatchlistService } from '../../../feature/watchlist/watchlist.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Store } from '@ngxs/store';
import { forkJoin, map, mergeMap } from 'rxjs';
import { MovieResponse, TvShowResponse } from '../../../shared/models/media.models';
import { NotificationsService } from '../../../core/notifications/notifications.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.less'],
})
export class WatchlistComponent implements OnInit {
  readonly statusNames = Object.values(WatchListStatus);
  readonly statusMap = {
    WATCHING: 'En cours',
    PLAN_TO_WATCH: 'Prévu',
    FINISHED: 'Terminé',
    ABANDONED: 'Abandonné',
  };

  movieWatchlist: { media: MovieResponse; watchlist: WatchlistItem }[] = [];
  showWatchlist: { media: TvShowResponse; watchlist: WatchlistItem }[] = [];

  constructor(
    private readonly store: Store,
    private readonly mediaService: MediaInfoService,
    private watchlistService: WatchlistService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (userId) {
      this.watchlistService
        .getWatchlistByUserId(userId)
        .pipe(
          mergeMap(watchlist =>
            forkJoin([
              ...watchlist
                .filter(item => item.mediaType === WatchListType.SHOW)
                .map(item =>
                  this.mediaService
                    .getTvShowInfo(item.mediaId)
                    .pipe(map(media => ({ media, watchlist: item })))
                ),
              ...watchlist
                .filter(item => item.mediaType === WatchListType.MOVIE)
                .map(item =>
                  this.mediaService
                    .getMovieInfo(item.mediaId)
                    .pipe(map(media => ({ media, watchlist: item })))
                ),
            ])
          )
        )
        .subscribe(watchlist => {
          this.movieWatchlist = watchlist
            .filter(item => item.watchlist.mediaType === WatchListType.MOVIE)
            .map(item => ({
              ...item,
              media: item.media as MovieResponse,
            }));
          this.showWatchlist = watchlist
            .filter(item => item.watchlist.mediaType === WatchListType.SHOW)
            .map(item => ({
              ...item,
              media: item.media as TvShowResponse,
            }));
        });
    }
  }

  changeShowStatus(
    item: { media: TvShowResponse; watchlist: WatchlistItem },
    status: WatchListStatus
  ) {
    item.watchlist.status = status;
    this.watchlistService
      .updateWatchlistItem(item.watchlist)
      .subscribe(() =>
        this.notifService.info(
          'Liste de suivie modifié',
          `Suivi ${this.statusMap[status]} pour ${item.media.title}`
        )
      );
  }
  changeMovieStatus(
    item: { media: MovieResponse; watchlist: WatchlistItem },
    status: WatchListStatus
  ) {
    item.watchlist.status = status;
    this.watchlistService
      .updateWatchlistItem(item.watchlist)
      .subscribe(() =>
        this.notifService.info(
          'Liste de suivie modifié',
          `Suivi ${this.statusMap[status]} pour ${item.media.title}`
        )
      );
  }
}
