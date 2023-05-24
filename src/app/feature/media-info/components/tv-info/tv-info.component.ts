import { Component, Input } from '@angular/core';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { mediasLinks } from '../../../../pages/medias/medias-routing.module';
import {
  Person,
  TvEpisodeResponse,
  TvShowResponse,
} from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrls: ['./tv-info.component.less'],
})
export class TvInfoComponent {
  readonly tvsByGenrePath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_genre.path}/`;
  readonly tvsByActorPath = `/${navigationRoot.medias.path}/${mediasLinks.tv_show_by_actor.path}/`;
  readonly tvsByNetworkPath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_network.path}/`;

  @Input() tv: TvShowResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;

  getSeasons(): number[] {
    return Array.from({ length: this.tv?.seasonsCount ?? 0 }, (_, i) => i + 1);
  }

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

  protected readonly Array = Array;
}
