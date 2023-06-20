import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MovieResponse } from '../../../shared/models/media.models';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-by-genre',
  templateUrl: './movie-by-genre.component.html',
  styleUrls: ['./movie-by-genre.component.less'],
})
export class MovieByGenreComponent implements OnInit, OnDestroy {
  genreId = 0;

  genreName = '';

  movies: MovieResponse[] = [];
  moviesPage = 1;
  moviesTotalPages = 0;
  moviesTotalResults = 0;
  isOnPhone = false;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,

    private route: ActivatedRoute,
    private mediaDiscoverService: MediaDiscoverService,
    private mediaAssetsService: MediaAssetsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.genreId = params['id'];
        this.getMovies();
        this.getGenreName();
      })
    );
  }

  getMovies(): void {
    this.subscriptions.push(
      this.mediaDiscoverService
        .getMovieByGenre(this.genreId, this.moviesPage)
        .subscribe(movies => {
          this.moviesTotalPages = movies.totalPage;
          this.moviesTotalResults = movies.totalResult;
          this.movies = movies.results;
        })
    );
  }

  getGenreName(): void {
    this.subscriptions.push(
      this.mediaAssetsService.getMovieGenre(this.genreId).subscribe(genre => {
        this.genreName = genre.name;
      })
    );
  }

  onMoviesPageChange(page: number): void {
    this.moviesPage = page;
    this.getMovies();
  }

  protected readonly Math = Math;

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
