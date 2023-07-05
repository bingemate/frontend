import { Component, OnDestroy, OnInit } from '@angular/core';
import { navigationRoot } from '../../../app-routing.module';
import { streamingLinks } from '../../streaming/streaming-routing.module';
import { Select } from '@ngxs/store';
import { forkJoin, map, Observable, Subscription, switchMap } from 'rxjs';
import { AuthState } from '../../../core/auth/store/auth.state';
import { EpisodeHistoryService } from '../../../feature/history/episode-history.service';
import { MovieHistoryService } from '../../../feature/history/movie-history.service';
import { HistoryModel } from '../../../shared/models/history.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  MovieResponse,
  TvEpisodeResponse,
  TvShowResponse,
} from '../../../shared/models/media.models';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-statistics-history',
  templateUrl: './statistics-history.component.html',
  styleUrls: ['./statistics-history.component.less'],
})
export class StatisticsHistoryComponent implements OnInit, OnDestroy {
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;

  isOnPhone = false;

  mediaStreamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  history: HistoryModel[] = [];
  historyLoading = false;

  mediaLoading = false;
  episodeResponseMap: Map<number, TvEpisodeResponse> = new Map();
  movieResponseMap: Map<number, MovieResponse> = new Map();
  tvShowsResponseMap: Map<number, TvShowResponse> = new Map();

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private episodeHistoryService: EpisodeHistoryService,
    private movieHistoryService: MovieHistoryService,
    private readonly mediaService: MediaInfoService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.historyLoading = true;
    this.subscriptions.push(
      forkJoin([
        this.episodeHistoryService.getEpisodesHistory(),
        this.movieHistoryService.getMovieHistory(),
      ]).subscribe({
        next: ([episodeHistory, movieHistory]) => {
          this.mediaLoading = true;
          this.history = [...episodeHistory, ...movieHistory].sort(
            (a, b) => b.viewedAt.getTime() - a.viewedAt.getTime()
          );
          this.loadMedias();
        },
        complete: () => {
          this.historyLoading = false;
        },
      })
    );
  }

  loadMedias() {
    this.mediaLoading = true;
    const episodesIds = this.history
      .filter(history => history.type === 'tv-shows')
      .map(history => history.mediaId);
    const moviesIds = this.history
      .filter(history => history.type === 'movies')
      .map(history => history.mediaId);

    const tvShowIds: Set<number> = new Set();
    type MediaResponses = [
      TvEpisodeResponse[],
      MovieResponse[],
      TvShowResponse[]
    ];

    this.subscriptions.push(
      forkJoin([
        this.mediaService.getTvShowEpisodesInfoByIds(episodesIds),
        this.mediaService.getMoviesShortInfo(moviesIds),
      ])
        .pipe(
          tap(([episodes]) => {
            episodes.forEach(episode => {
              tvShowIds.add(episode.tvShowId);
            });
          }),
          switchMap(([episodes, movies]) => {
            return this.mediaService
              .getTvShowsShortInfo(Array.from(tvShowIds))
              .pipe(
                map(tvShows => [episodes, movies, tvShows] as MediaResponses)
              );
          })
        )
        .subscribe({
          next: ([episodes, movies, tvShows]) => {
            episodes.forEach(episode =>
              this.episodeResponseMap.set(episode.id, episode)
            );
            movies.forEach(movie => this.movieResponseMap.set(movie.id, movie));
            tvShows.forEach(tvShow =>
              this.tvShowsResponseMap.set(tvShow.id, tvShow)
            );
          },
          complete: () => {
            this.mediaLoading = false;
          },
        })
    );
  }

  deleteMedia(history: HistoryModel) {
    const historyList = this.history.filter(
      historyItem => historyItem.mediaId !== history.mediaId
    );
    if (history.type === 'movies') {
      this.subscriptions.push(
        this.movieHistoryService
          .deleteMovieHistory(history.mediaId)
          .subscribe(() => (this.history = historyList))
      );
    } else {
      this.subscriptions.push(
        this.episodeHistoryService
          .deleteEpisodeHistory(history.mediaId)
          .subscribe(() => (this.history = historyList))
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
