import { Component, Input } from '@angular/core';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { mediasLinks } from '../../../../pages/medias/medias-routing.module';
import { Person, TvShowResponse } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrls: ['./tv-info.component.less'],
})
export class TvInfoComponent {
  readonly streamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;
  readonly tvsByGenrePath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_genre.path}/`;
  readonly tvsByNetworkPath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_network.path}/`;

  @Input() tv: TvShowResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;

  getRate(): number {
    return Math.round(this.tv?.voteAverage ?? 0) / 2;
  }

  getActorsSlice(): Person[] {
    const start = (this.actorsCurrentPage - 1) * this.actorsPageSize;
    const end = start + this.actorsPageSize;
    return this.tv?.actors.slice(start, end) ?? [];
  }

  onActorsPageChange(page: number): void {
    this.actorsCurrentPage = page;
  }
}
