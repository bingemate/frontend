import { Component, OnInit } from '@angular/core';
import { MovieResponse, TvShowResponse } from '../../../shared/models/media.models';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.less'],
})
export class TrendingComponent implements OnInit {
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

  mediaByComments: number[] = [];
  mediaByCommentsLoading = false;

  onlyAvailable = false;

  constructor(private mediaDiscoverService: MediaDiscoverService) {}

  ngOnInit(): void {
    this.getPopularMovies();
    this.getRecentMovies();
    this.getPopularTvShows();
    this.getRecentTvShows();
    this.onGetMediaByComments();
  }

  getPopularMovies(): void {
    this.popularMoviesLoading = true;
    this.mediaDiscoverService
      .getPopularMovies(this.popularMoviesPage, this.onlyAvailable)
      .subscribe(movies => {
        this.popularMoviesLoading = false;
        this.popularMoviesTotalResults = movies.totalResult;
        this.popularMovies = movies.results;
      });
  }

  getRecentMovies(): void {
    this.recentMoviesLoading = true;
    this.mediaDiscoverService
      .getRecentMovies(this.onlyAvailable)
      .subscribe(movies => {
        this.recentMoviesLoading = false;
        this.recentMovies = movies;
      });
  }

  getPopularTvShows(): void {
    this.popularTvShowsLoading = true;
    this.mediaDiscoverService
      .getPopularTvShows(this.popularTvShowsPage, this.onlyAvailable)
      .subscribe(tvShows => {
        this.popularTvShowsLoading = false;
        this.popularTvShowsTotalResults = tvShows.totalResult;
        this.popularTvShows = tvShows.results;
      });
  }

  getRecentTvShows(): void {
    this.recentTvShowsLoading = true;
    this.mediaDiscoverService
      .getRecentTvShows(this.onlyAvailable)
      .subscribe(tvShows => {
        this.recentTvShowsLoading = false;
        this.recentTvShows = tvShows;
      });
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
    this.mediaByCommentsLoading = true;
    this.mediaDiscoverService
      .getMediasByComments(this.onlyAvailable)
      .subscribe(media => {
        this.mediaByCommentsLoading = false;
        this.mediaByComments = media;
      });
  }

  protected readonly Math = Math;
}
