import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Select, Store } from '@ngxs/store';
import { UserResponse } from '../../../../shared/models/user.models';
import { filter, forkJoin, interval, Observable, Subscription } from 'rxjs';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { EpisodeHistoryService } from '../../../history/episode-history.service';
import {
  MovieResponse,
  TvShowResponse,
} from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../../media-info/media-info.service';
import { MediaDiscoverService } from '../../../media-info/media-discover.service';
import { HistoryModel } from '../../../../shared/models/history.models';
import { MovieHistoryService } from '../../../history/movie-history.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WatchTogetherRoom } from '../../../../shared/models/watch-together.models';
import { WatchTogetherState } from '../../../watch-together/store/watch-together.state';
import { WatchTogetherService } from '../../../watch-together/watch-together.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.less'],
})
export class AuthHomeComponent implements OnInit, OnDestroy {
  mediaStreamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  @Select(AuthState.user) user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  @Select(AuthState.isSubscribed) isSubscribed$!: Observable<boolean>;
  @Select(WatchTogetherState.invitedRooms) invitedRooms$!: Observable<
    WatchTogetherRoom[]
  >;
  isSubscribed = false;

  history: HistoryModel[] = [];
  rooms: WatchTogetherRoom[] = [];

  recentMovies: MovieResponse[] = [];
  recentTvShows: TvShowResponse[] = [];

  popularMovies: MovieResponse[] = [];
  popularTvShows: TvShowResponse[] = [];

  isOnPhone = false;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private readonly episodeHistoryService: EpisodeHistoryService,
    private readonly movieHistoryService: MovieHistoryService,
    private readonly mediaInfoService: MediaInfoService,
    private readonly mediaDiscoverService: MediaDiscoverService,
    private readonly watchTogetherService: WatchTogetherService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });

    this.user$.subscribe(user => (this.user = user));
    this.isSubscribed$.subscribe(
      isSubscribed => (this.isSubscribed = isSubscribed)
    );
  }

  ngOnInit(): void {
    forkJoin([
      this.episodeHistoryService.getEpisodeHistory(),
      this.movieHistoryService.getMovieHistory(),
    ]).subscribe(
      ([episodeHistory, movieHistory]) =>
        (this.history = [...episodeHistory, ...movieHistory]
          .filter(history => history.stoppedAt < 0.9)
          .sort((a, b) => b.viewedAt.getTime() - a.viewedAt.getTime()))
    );
    this.mediaDiscoverService.getPopularMovies().subscribe(movies => {
      this.popularMovies = movies.results;
    });
    this.mediaDiscoverService.getPopularTvShows().subscribe(tvShows => {
      this.popularTvShows = tvShows.results;
    });
    this.mediaDiscoverService.getRecentTvShows(true).subscribe(tvShows => {
      this.recentTvShows = tvShows;
    });
    this.mediaDiscoverService.getRecentMovies(true).subscribe(movies => {
      this.recentMovies = movies;
    });
    this.invitedRooms$
      .pipe(filter(rooms => rooms !== undefined && rooms !== null))
      .subscribe(rooms => (this.rooms = rooms));
    this.subscriptions.push(
      interval(5000).subscribe(() => this.watchTogetherService.getRooms())
    );
    this.watchTogetherService.getRooms();
  }

  joinWatchTogetherRoom(room: WatchTogetherRoom) {
    this.watchTogetherService.joinRoom(room.id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
