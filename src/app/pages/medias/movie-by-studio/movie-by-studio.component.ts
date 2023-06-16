import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-movie-by-studio',
  templateUrl: './movie-by-studio.component.html',
  styleUrls: ['./movie-by-studio.component.less'],
})
export class MovieByStudioComponent implements OnInit {
  studioId = 0;
  studioName = '';

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
      this.studioId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getMovies();
    this.getStudioName();
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

  getStudioName(): void {
    this.mediaAssetsService.getStudio(this.studioId).subscribe(studio => {
      this.studioName = studio.name;
    });
  }

  onMoviesPageChange(page: number): void {
    this.moviesPage = page;
    this.getMovies();
  }

  protected readonly Math = Math;
}
