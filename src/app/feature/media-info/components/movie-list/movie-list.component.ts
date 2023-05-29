import { Component, Input } from '@angular/core';
import { MovieResponse } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.less'],
})
export class MovieListComponent {
  @Input() movies: MovieResponse[] = [];
}
