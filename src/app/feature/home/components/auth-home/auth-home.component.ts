import { Component, OnInit } from '@angular/core';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Select } from '@ngxs/store';
import { UserResponse } from '../../../../shared/models/user.models';
import { map, Observable, switchMap } from 'rxjs';
import { HistoryModel } from '../../../../shared/models/history.models';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { HistoryService } from '../../../history/history.service';
import {
  MediaType,
  MovieResponse,
  TvShowResponse,
} from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../../media-info/media-info.service';
import { MediaDiscoverService } from '../../../media-info/media-discover.service';

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
    private readonly historyService: HistoryService,
    private readonly mediaInfoService: MediaInfoService,
    private readonly mediaDiscoverService: MediaDiscoverService
  ) {
    this.user$.subscribe(user => (this.user = user));
    this.isSubscribed$.subscribe(
      isSubscribed => (this.isSubscribed = isSubscribed)
    );
  }

  ngOnInit(): void {
    this.historyService.getHistory().subscribe(history => {
      this.history = history.filter(history => history.stoppedAt < 0.9);
    });
    this.mediaDiscoverService.getPopularMovies().subscribe(movies => {
      this.popularMovies = movies.results;
    });
    this.mediaDiscoverService.getPopularTvShows().subscribe(tvShows => {
      this.popularTvShows = tvShows.results;
    });
  }
}
