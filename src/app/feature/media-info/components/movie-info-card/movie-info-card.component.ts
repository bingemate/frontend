import { Component, Input } from '@angular/core';
import { MovieResponse } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-movie-info-card',
  templateUrl: './movie-info-card.component.html',
  styleUrls: ['./movie-info-card.component.less'],
})
export class MovieInfoCardComponent {
  @Input() movie?: MovieResponse;
}
