import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { navigationRoot } from '../../../../app-routing.module';
import { mediasLinks } from '../../../../pages/medias/medias-routing.module';
import { Person, TvShowResponse } from '../../../../shared/models/media.models';
import {
  WatchListStatus,
  WatchListType,
} from '../../../../shared/models/watchlist.models';
import { WatchlistService } from '../../../watchlist/watchlist.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrls: ['./tv-info.component.less'],
})
export class TvInfoComponent implements OnChanges {
  readonly tvsByGenrePath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_genre.path}/`;
  readonly tvsByActorPath = `/${navigationRoot.medias.path}/${mediasLinks.tv_show_by_actor.path}/`;
  readonly tvsByNetworkPath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_network.path}/`;
  readonly statusNames = Object.values(WatchListStatus);
  readonly statusMap = {
    WATCHING: 'En cours',
    PLAN_TO_WATCH: 'Prévu',
    FINISHED: 'Terminé',
    ABANDONED: 'Abandonné',
  };

  @Input() tv: TvShowResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;
  isMediaInWatchList = true;
  constructor(
    private readonly notificationsService: NotificationsService,
    private watchlistService: WatchlistService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tv'].currentValue &&
      changes['tv'].currentValue !== changes['tv'].previousValue &&
      this.tv
    ) {
      this.watchlistService.getWatchlistItem(this.tv.id).subscribe(item => {
        if (!item) {
          this.isMediaInWatchList = false;
        }
      });
    }
  }

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

  addToWatchlist(status: WatchListStatus) {
    if (this.tv) {
      this.watchlistService
        .createWatchlistItem({
          status,
          mediaId: this.tv.id,
          mediaType: WatchListType.SHOW,
        })
        .subscribe(() => {
          this.notificationsService.info(
            'La série a été ajouté aux films suivis'
          );
          this.isMediaInWatchList = true;
        });
    }
  }
}
