import { Component, OnInit } from '@angular/core';
import {
  MovieResponse,
  TvShowResponse,
} from '../../../shared/models/media.models';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { max } from 'rxjs';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.less'],
})
export class TrendingComponent implements OnInit {
  popularMovies: MovieResponse[] = [];
  popularMoviesPage = 1;
  popularMoviesTotalPages = 0;
  popularMoviesTotalResults = 0;
  recentMovies: MovieResponse[] = [];

  popularTvShows: TvShowResponse[] = [];
  popularTvShowsPage = 1;
  popularTvShowsTotalPages = 0;
  popularTvShowsTotalResults = 0;
  recentTvShows: TvShowResponse[] = [];
  constructor(private mediaDiscoverService: MediaDiscoverService) {}

  ngOnInit(): void {
    this.getPopularMovies();
    this.getRecentMovies();
    this.getPopularTvShows();
    this.getRecentTvShows();
  }

  getPopularMovies(): void {
    this.mediaDiscoverService
      .getPopularMovies(this.popularMoviesPage)
      .subscribe(movies => {
        this.popularMoviesTotalPages = movies.totalPage;
        this.popularMoviesTotalResults = movies.totalResult;
        this.popularMovies = movies.results;
      });
  }

  getRecentMovies(): void {
    this.mediaDiscoverService.getRecentMovies().subscribe(movies => {
      this.recentMovies = movies;
    });
  }

  getPopularTvShows(): void {
    this.mediaDiscoverService
      .getPopularTvShows(this.popularTvShowsPage)
      .subscribe(tvShows => {
        this.popularTvShowsTotalPages = tvShows.totalPage;
        this.popularTvShowsTotalResults = tvShows.totalResult;
        this.popularTvShows = tvShows.results;
      });
  }

  getRecentTvShows(): void {
    this.mediaDiscoverService.getRecentTvShows().subscribe(tvShows => {
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

  protected readonly Math = Math;
}
