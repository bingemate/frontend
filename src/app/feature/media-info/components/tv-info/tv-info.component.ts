import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { navigationRoot } from '../../../../app-routing.module';
import { mediasLinks } from '../../../../pages/medias/medias-routing.module';
import { Person, TvShowResponse } from '../../../../shared/models/media.models';
import {
  WatchlistItem,
  WatchListStatus,
  WatchListType,
} from '../../../../shared/models/watchlist.models';
import { WatchlistService } from '../../../watchlist/watchlist.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../../shared/models/user.models';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrls: ['./tv-info.component.less'],
})
export class TvInfoComponent implements OnChanges {
  @Select(AuthState.user)
  readonly user$!: Observable<UserResponse>;
  userId = '';

  readonly tvsByGenrePath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_genre.path}/`;
  readonly tvsByActorPath = `/${navigationRoot.medias.path}/${mediasLinks.tv_show_by_actor.path}/`;
  readonly tvsByNetworkPath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_network.path}/`;
  readonly statusNames = Object.values(WatchListStatus);

  @Input() tv: TvShowResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;
  isMediaInWatchList = false;
  watchlistItem: WatchlistItem | undefined;

  constructor(
    private readonly notificationsService: NotificationsService,
    private watchlistService: WatchlistService
  ) {
    this.user$.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tv'].currentValue &&
      changes['tv'].currentValue !== changes['tv'].previousValue &&
      this.tv
    ) {
      this.watchlistService.getWatchlistItem(this.tv.id).subscribe(item => {
        if (!item) {
          this.isMediaInWatchList = false;
        } else {
          this.isMediaInWatchList = true;
          this.watchlistItem = item;
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
          this.notificationsService.success(
            'La série a été ajouté aux séries suivis'
          );
          this.isMediaInWatchList = true;
          this.watchlistItem = {
            mediaId: this.tv!.id,
            mediaType: WatchListType.SHOW,
            status,
            userId: this.userId,
          };
        });
    }
  }

  changeShowStatus(status: WatchListStatus) {
    this.watchlistItem!.status = status;
    this.watchlistService
      .updateWatchlistItem(this.watchlistItem!)
      .subscribe(() =>
        this.notificationsService.success('Liste de suivie modifié')
      );
  }

  removeShowWatchlist() {
    this.watchlistService
      .removeFromWatchlist(this.watchlistItem!.mediaId)
      .subscribe(() => {
        this.isMediaInWatchList = false;
        this.watchlistItem = undefined;
        this.notificationsService.success(
          'La série a été retiré des séries suivis'
        );
      });
  }
}
