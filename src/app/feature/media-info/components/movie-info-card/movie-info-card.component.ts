import { Component, Input, OnInit } from '@angular/core';
import { MovieResponse } from '../../../../shared/models/media.models';
import { movieViewPath } from '../../../../pages/social-network/social-network-routing.module';

@Component({
  selector: 'app-movie-info-card',
  templateUrl: './movie-info-card.component.html',
  styleUrls: ['./movie-info-card.component.less'],
})
export class MovieInfoCardComponent implements OnInit {
  movieViewPath = movieViewPath;
  @Input() movie?: MovieResponse;

  ngOnInit(): void {
    this.movieViewPath = movieViewPath + '/' + this.movie?.id;
  }

  getRate(): number {
    return Math.round(this.movie?.voteAverage ?? 0) / 2;
  }
}
