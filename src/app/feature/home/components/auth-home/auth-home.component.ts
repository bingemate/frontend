import { Component, OnInit } from '@angular/core';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Select } from '@ngxs/store';
import { UserResponse } from '../../../../shared/models/user.models';
import { forkJoin, Observable } from 'rxjs';
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

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.less'],
})
export class AuthHomeComponent implements OnInit {
  mediaStreamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  @Select(AuthState.user) user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  @Select(AuthState.isSubscribed) isSubscribed$!: Observable<boolean>;
  isSubscribed = false;

  history: HistoryModel[] = [];

  recentMovies: MovieResponse[] = [];
  recentTvShows: TvShowResponse[] = [];

  popularMovies: MovieResponse[] = [];
  popularTvShows: TvShowResponse[] = [];

  constructor(
    private readonly episodeHistoryService: EpisodeHistoryService,
    private readonly movieHistoryService: MovieHistoryService,
    private readonly mediaInfoService: MediaInfoService,
    private readonly mediaDiscoverService: MediaDiscoverService
  ) {
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
  }
}
