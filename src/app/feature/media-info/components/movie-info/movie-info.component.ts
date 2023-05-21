import { Component, Input } from '@angular/core';
import { MovieResponse, Person } from '../../../../shared/models/media.models';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.less'],
})
export class MovieInfoComponent {
  readonly streamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  @Input() movie: MovieResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;

  getRate(): number {
    return Math.round(this.movie?.voteAverage ?? 0) / 2;
  }

  getActorsSlice(): Person[] {
    const start = (this.actorsCurrentPage - 1) * this.actorsPageSize;
    const end = start + this.actorsPageSize;
    return this.movie?.actors.slice(start, end) ?? [];
  }

  onActorsPageChange(page: number): void {
    this.actorsCurrentPage = page;
  }
}
