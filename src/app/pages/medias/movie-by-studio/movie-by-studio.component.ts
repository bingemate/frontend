import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';

@Component({
  selector: 'app-movie-by-studio',
  templateUrl: './movie-by-studio.component.html',
  styleUrls: ['./movie-by-studio.component.less'],
})
export class MovieByStudioComponent implements OnInit {
  studioId = 0;

  movies: MovieResponse[] = [];
  moviesPage = 1;
  moviesTotalPages = 0;
  moviesTotalResults = 0;

  constructor(
    private route: ActivatedRoute,
    private mediaDiscoverService: MediaDiscoverService
  ) {
    this.route.params.subscribe(params => {
      this.studioId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.mediaDiscoverService
      .getMovieByStudio(this.studioId, this.moviesPage)
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
