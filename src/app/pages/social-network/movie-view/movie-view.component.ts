import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from '../../../shared/models/media.models';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.less'],
})
export class MovieViewComponent implements OnInit {
  movieId?: number;
  movie?: MovieResponse;

  constructor(
    currentRoute: ActivatedRoute,
    private mediaInfoService: MediaInfoService
  ) {
    currentRoute.params.subscribe(params => {
      this.movieId = params['id'];
    });
  }

  ngOnInit(): void {
    this.mediaInfoService.getMovieInfo(this.movieId ?? 0).subscribe(movie => {
      this.movie = movie;
    });
  }
}
