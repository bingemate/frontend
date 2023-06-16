import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MovieResponse } from '../../../shared/models/media.models';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-movie-by-genre',
  templateUrl: './movie-by-genre.component.html',
  styleUrls: ['./movie-by-genre.component.less'],
})
export class MovieByGenreComponent implements OnInit {
  genreId = 0;

  genreName = '';

  movies: MovieResponse[] = [];
  moviesPage = 1;
  moviesTotalPages = 0;
  moviesTotalResults = 0;
  isOnPhone = false;

  constructor(
    private breakpointObserver: BreakpointObserver,

    private route: ActivatedRoute,
    private mediaDiscoverService: MediaDiscoverService,
    private mediaAssetsService: MediaAssetsService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
    this.route.params.subscribe(params => {
      this.genreId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getMovies();
    this.getGenreName();
  }

  getMovies(): void {
    this.mediaDiscoverService
      .getMovieByGenre(this.genreId, this.moviesPage)
      .subscribe(movies => {
        this.moviesTotalPages = movies.totalPage;
        this.moviesTotalResults = movies.totalResult;
        this.movies = movies.results;
      });
  }

  getGenreName(): void {
    this.mediaAssetsService.getMovieGenre(this.genreId).subscribe(genre => {
      this.genreName = genre.name;
    });
  }

  onMoviesPageChange(page: number): void {
    this.moviesPage = page;
    this.getMovies();
  }

  protected readonly Math = Math;
}
