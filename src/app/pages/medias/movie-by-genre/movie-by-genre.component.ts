import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MovieResponse } from '../../../shared/models/media.models';

@Component({
  selector: 'app-movie-by-genre',
  templateUrl: './movie-by-genre.component.html',
  styleUrls: ['./movie-by-genre.component.less'],
})
export class MovieByGenreComponent implements OnInit {
  genreId = 0;

  movies: MovieResponse[] = [];
  moviesPage = 1;
  moviesTotalPages = 0;
  moviesTotalResults = 0;

  constructor(
    private route: ActivatedRoute,
    private mediaDiscoverService: MediaDiscoverService
  ) {
    this.route.params.subscribe(params => {
      this.genreId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getMovies();
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

  onMoviesPageChange(page: number): void {
    this.moviesPage = page;
    this.getMovies();
  }

  protected readonly Math = Math;
}
