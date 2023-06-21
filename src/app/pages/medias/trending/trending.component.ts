import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MovieResponse,
  TvShowResponse,
} from '../../../shared/models/media.models';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.less'],
})
export class TrendingComponent implements OnInit, OnDestroy {
  isOnPhone = false;

  popularMovies: MovieResponse[] = [];
  popularMoviesPage = 1;
  popularMoviesLoading = false;
  popularMoviesTotalResults = 0;
  recentMovies: MovieResponse[] = [];
  recentMoviesLoading = false;

  popularTvShows: TvShowResponse[] = [];
  popularTvShowsPage = 1;
  popularTvShowsLoading = false;
  popularTvShowsTotalResults = 0;
  recentTvShows: TvShowResponse[] = [];
  recentTvShowsLoading = false;

  mediaByComments: { type: 'movie' | 'tv'; id: number }[] = [];
  moviesByCommentsLoading = false;
  tvShowsByCommentsLoading = false;

  onlyAvailable = false;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaDiscoverService: MediaDiscoverService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });

    this.getPopularMovies();
    this.getRecentMovies();
    this.getPopularTvShows();
    this.getRecentTvShows();
    this.onGetMediaByComments();
  }

  getPopularMovies(): void {
    this.popularMoviesLoading = true;
    this.subscriptions.push(
      this.mediaDiscoverService
        .getPopularMovies(this.popularMoviesPage, this.onlyAvailable)
        .subscribe(movies => {
          this.popularMoviesLoading = false;
          this.popularMoviesTotalResults = movies.totalResult;
          this.popularMovies = movies.results;
        })
    );
  }

  getRecentMovies(): void {
    this.recentMoviesLoading = true;
    this.subscriptions.push(
      this.mediaDiscoverService
        .getRecentMovies(this.onlyAvailable)
        .subscribe(movies => {
          this.recentMoviesLoading = false;
          this.recentMovies = movies;
        })
    );
  }

  getPopularTvShows(): void {
    this.popularTvShowsLoading = true;
    this.subscriptions.push(
      this.mediaDiscoverService
        .getPopularTvShows(this.popularTvShowsPage, this.onlyAvailable)
        .subscribe(tvShows => {
          this.popularTvShowsLoading = false;
          this.popularTvShowsTotalResults = tvShows.totalResult;
          this.popularTvShows = tvShows.results;
        })
    );
  }

  getRecentTvShows(): void {
    this.recentTvShowsLoading = true;
    this.subscriptions.push(
      this.mediaDiscoverService
        .getRecentTvShows(this.onlyAvailable)
        .subscribe(tvShows => {
          this.recentTvShowsLoading = false;
          this.recentTvShows = tvShows;
        })
    );
  }

  onPopularMoviesPageChange(page: number): void {
    this.popularMoviesPage = page;
    this.getPopularMovies();
  }

  onPopularTvShowsPageChange(page: number): void {
    this.popularTvShowsPage = page;
    this.getPopularTvShows();
  }

  onOnlyAvailableChecked(checked: boolean) {
    this.onlyAvailable = checked;
    this.ngOnInit();
  }

  onGetMediaByComments() {
    this.moviesByCommentsLoading = true;
    this.tvShowsByCommentsLoading = true;
    this.mediaByComments = [];
    this.subscriptions.push(
      this.mediaDiscoverService
        .getMoviesByComments(this.onlyAvailable)
        .subscribe(media => {
          this.moviesByCommentsLoading = false;
          console.log('before adding movies', this.mediaByComments);
          this.mediaByComments.push(
            ...media.map(
              m => ({ type: 'movie', id: m } as { type: 'movie'; id: number })
            )
          );
          console.log('after adding movies', this.mediaByComments);
        })
    );
    this.subscriptions.push(
      this.mediaDiscoverService
        .getTvShowsByComments(this.onlyAvailable)
        .subscribe(media => {
          this.tvShowsByCommentsLoading = false;
          console.log('before adding tv shows', this.mediaByComments);
          this.mediaByComments.push(
            ...media.map(
              m => ({ type: 'tv', id: m } as { type: 'tv'; id: number })
            )
          );
          console.log('after adding tv shows', this.mediaByComments);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected readonly Math = Math;
}
