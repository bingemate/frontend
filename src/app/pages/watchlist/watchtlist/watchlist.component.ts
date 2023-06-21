import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { TvShowWatchlistService } from '../../../feature/watchlist/tv-show-watchlist.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Select, Store } from '@ngxs/store';
import { forkJoin, map, mergeMap, Observable, Subscription } from 'rxjs';
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
  EpisodeWatchlistItem,
  TvShowWatchlistItem,
  TvShowWatchListStatus,
} from '../../../shared/models/tv-show-watchlist.models';
import { MovieWatchlistService } from '../../../feature/watchlist/movie-watchlist.service';
import { UserResponse } from '../../../shared/models/user.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.less'],
})
export class WatchlistComponent implements OnInit, OnDestroy {
  protected readonly movieViewPath = movieViewPath;
  protected readonly tvShowViewPath = tvShowViewPath;
  isOnPhone = false;

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
  tvShowWatchlist: { media: TvShowResponse; watchlist: TvShowWatchlistItem }[] =
    [];
  episodesWatchlist: Map<
    number,
    {
      loading: boolean;
      episodes: EpisodeWatchlistItem[];
    }
  > = new Map();
  episodesCollapsed: Map<number, boolean> = new Map();

  showWatchlistLoading = false;

  query = '';
  filter = '';
  queryTimeout = 0;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly store: Store,
    private readonly mediaService: MediaInfoService,
    private tvShowWatchlistService: TvShowWatchlistService,
    private movieWatchlistService: MovieWatchlistService,
    private notifService: NotificationsService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe(user => {
        if (user) {
          this.loadTvWatchlist(user);
          this.loadMovieWatchlist(user);
        }
      })
    );
  }

  onQuery() {
    clearTimeout(this.queryTimeout);
    this.queryTimeout = setTimeout(() => {
      this.filter = this.query;
    }, 300);
  }

  private loadMovieWatchlist(user: UserResponse) {
    this.movieWatchlistLoading = true;
    this.subscriptions.push(
      this.movieWatchlistService
        .getWatchlistByUserId(user.id)
        .pipe(
          mergeMap(watchlist => {
            const movieIds = watchlist.map(item => item.movieId);
            return this.mediaService.getMoviesShortInfo(movieIds).pipe(
              map(movies =>
                movies.map(movie => ({
                  media: movie,
                  watchlist: watchlist.find(item => item.movieId === movie.id)!,
                }))
              )
            );
          })
        )
        .subscribe({
          next: watchlist => {
            this.movieWatchlist = watchlist;
          },
          complete: () => (this.movieWatchlistLoading = false),
        })
    );
  }

  private loadTvWatchlist(user: UserResponse) {
    this.showWatchlistLoading = true;
    this.subscriptions.push(
      this.tvShowWatchlistService
        .getWatchlistByUserId(user.id)
        .pipe(
          mergeMap(watchlist => {
            const tvShowIds = watchlist.map(item => item.tvShowId);
            for (const tvShowIdsKey in tvShowIds) {
              this.episodesCollapsed.set(tvShowIds[tvShowIdsKey], false);
            }
            return this.mediaService.getTvShowsShortInfo(tvShowIds).pipe(
              map(shows =>
                shows.map(show => ({
                  media: show,
                  watchlist: watchlist.find(item => item.tvShowId === show.id)!,
                }))
              )
            );
          })
        )
        .subscribe({
          next: watchlist => {
            this.tvShowWatchlist = watchlist;
          },
          complete: () => (this.showWatchlistLoading = false),
        })
    );
  }

  /*loadTvShowEpisodes(item: {
    media: TvShowResponse;
    watchlist: TvShowWatchlistItem;
  }) {
    return this.mediaService.getTvShowAllEpisodes(item.media.id).pipe(
      map(episodes => {
        const episodeItems: EpisodeWatchlistItem[] = episodes.map(episode => ({
          episodeId: episode.id,
          name: episode.name,
          episode: episode.episodeNumber,
          season: episode.seasonNumber,
          tvShowId: item.media.id,
          saved: false,
          status: '-',
        }));
        episodeItems.forEach(episodeItem => {
          const savedItem = this.episodesWatchlist
            .get(item.media.id)
            ?.episodes?.find(
              savedItem => savedItem.episodeId === episodeItem.episodeId
            );
          if (savedItem) {
            episodeItem.saved = true;
            episodeItem.status = savedItem.status;
          }
        });
        item.watchlist.episodes = episodeItems;
        return item;
      })
    );
  }*/

  getTvListByStatus(status: string) {
    return this.tvShowWatchlist.filter(
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
    this.subscriptions.push(
      this.tvShowWatchlistService
        .updateWatchlistItem(item.watchlist)
        .subscribe(() =>
          this.notifService.success(
            'Liste de suivie modifié',
            `Suivi ${this.statusMap[status]} pour ${item.media.title}`
          )
        )
    );
  }

  changeEpisodeStatus(
    item: EpisodeWatchlistItem,
    status: TvShowWatchListStatus
  ) {
    item.status = status;
    if (item.saved) {
      this.subscriptions.push(
        this.tvShowWatchlistService.updateEpisodeWatchlistItem(item).subscribe()
      );
    } else {
      item.saved = true;
      this.subscriptions.push(
        this.tvShowWatchlistService
          .createEpisodeWatchlistItem({
            status: status,
            tvShowId: item.tvShowId,
            episodeId: item.episodeId,
          })
          .subscribe()
      );
    }
  }

  changeMovieStatus(
    item: { media: MovieResponse; watchlist: MovieWatchlistItem },
    status: MovieWatchListStatus
  ) {
    item.watchlist.status = status;
    this.subscriptions.push(
      this.movieWatchlistService
        .updateWatchlistItem(item.watchlist)
        .subscribe(() =>
          this.notifService.success(
            'Liste de suivie modifié',
            `Suivi ${this.statusMap[status]} pour ${item.media.title}`
          )
        )
    );
  }

  removeMovieWatchlist(item: {
    media: MovieResponse;
    watchlist: MovieWatchlistItem;
  }) {
    this.subscriptions.push(
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
        })
    );
  }

  removeShowWatchlist(item: {
    media: TvShowResponse;
    watchlist: TvShowWatchlistItem;
  }) {
    this.subscriptions.push(
      this.tvShowWatchlistService
        .removeFromWatchlist(item.watchlist.tvShowId)
        .subscribe(() => {
          this.tvShowWatchlist = this.tvShowWatchlist.filter(
            wlLtem => item.media.id !== wlLtem.media.id
          );
          this.notifService.success(
            'Liste de suivie modifié',
            `${item.media.title} a été retiré`
          );
        })
    );
  }

  isEpisodePanelOpened(tvShowId: number) {
    return this.episodesCollapsed.get(tvShowId) ?? false;
  }

  onEpisodePanelOpened(tvShowId: number, open: boolean) {
    if (!open) {
      this.episodesCollapsed.set(tvShowId, false);
      this.episodesWatchlist.set(tvShowId, {
        loading: false,
        episodes: [],
      });
      return;
    }
    this.episodesCollapsed.forEach((value, key) => {
      if (key !== tvShowId) {
        this.episodesCollapsed.set(key, false);
      } else {
        this.episodesCollapsed.set(key, true);
      }
    });
    this.episodesWatchlist.set(tvShowId, {
      loading: true,
      episodes: [],
    });
    const item = this.tvShowWatchlist.find(item => item.media.id === tvShowId);
    if (!item) {
      console.error('No item found');
      return;
    }
    this.subscriptions.push(
      this.mediaService
        .getTvShowAllEpisodes(item.media.id)
        .pipe(
          map(episodes => {
            const episodeItems: EpisodeWatchlistItem[] = episodes.map(
              episode => ({
                episodeId: episode.id,
                name: episode.name,
                episode: episode.episodeNumber,
                season: episode.seasonNumber,
                tvShowId: item.media.id,
                saved: false,
                status: '-',
              })
            );
            episodeItems.forEach(episodeItem => {
              const savedItem = item.watchlist.episodes?.find(
                savedItem => savedItem.episodeId === episodeItem.episodeId
              );
              if (savedItem) {
                episodeItem.saved = true;
                episodeItem.status = savedItem.status;
              }
            });
            this.episodesWatchlist.set(tvShowId, {
              loading: false,
              episodes: episodeItems,
            });
          })
        )
        .subscribe()
    );
  }

  getEpisodesWatchlist(tvShowId: number) {
    return this.episodesWatchlist.get(tvShowId)?.episodes ?? [];
  }

  isEpisodeWatchlistLoading(tvShowId: number) {
    return this.episodesWatchlist.get(tvShowId)?.loading ?? false;
  }

  ngOnDestroy(): void {
    clearTimeout(this.queryTimeout);
  }
}
