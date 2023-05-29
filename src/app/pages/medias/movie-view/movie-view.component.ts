import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from '../../../shared/models/media.models';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.less'],
})
export class MovieViewComponent {
  movieId?: number;
  movie?: MovieResponse;
  movieRecommendations: MovieResponse[] = [];

  constructor(
    currentRoute: ActivatedRoute,
    private mediaInfoService: MediaInfoService,
    private mediaDiscoverService: MediaDiscoverService
  ) {
    currentRoute.params.subscribe(params => {
      this.movieId = params['id'];
      this.onGetMovie();
    });
  }
  onGetMovie() {
    this.mediaInfoService.getMovieInfo(this.movieId ?? 0).subscribe(movie => {
      this.movie = movie;
    });
    this.mediaDiscoverService
      .getMovieRecommendations(this.movieId ?? 0)
      .subscribe(movieRecommendations => {
        this.movieRecommendations = movieRecommendations;
      });
  }
}
