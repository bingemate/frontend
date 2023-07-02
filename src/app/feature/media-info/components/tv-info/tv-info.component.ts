import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { navigationRoot } from '../../../../app-routing.module';
import {
  mediaByActorPath,
  mediasLinks,
} from '../../../../pages/medias/medias-routing.module';
import { Person, TvShowResponse } from '../../../../shared/models/media.models';
import { TvShowWatchlistService } from '../../../watchlist/tv-show-watchlist.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Observable, Subscription } from 'rxjs';
import { UserResponse } from '../../../../shared/models/user.models';
import {
  TvShowWatchlistItem,
  TvShowWatchListStatus,
} from '../../../../shared/models/tv-show-watchlist.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrls: ['./tv-info.component.less'],
})
export class TvInfoComponent implements OnChanges, OnInit, OnDestroy {
  @Select(AuthState.user)
  readonly user$!: Observable<UserResponse>;
  userId = '';

  isOnPhone = false;

  readonly tvsByGenrePath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_genre.path}/`;
  readonly mediasByActorPath = mediaByActorPath;
  readonly tvsByNetworkPath = `/${navigationRoot.medias.path}/${mediasLinks.tv_shows_by_network.path}/`;
  readonly statusNames = Object.values(TvShowWatchListStatus);

  @Input() tv: TvShowResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;
  isMediaInWatchList = false;
  watchlistItem: TvShowWatchlistItem | undefined;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly notificationsService: NotificationsService,
    private watchlistService: TvShowWatchlistService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );

    this.subscriptions.push(
      this.user$.subscribe(user => {
        if (user) {
          this.userId = user.id;
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tv'].currentValue &&
      changes['tv'].currentValue !== changes['tv'].previousValue &&
      this.tv
    ) {
      this.subscriptions.push(
        this.watchlistService.getWatchlistItem(this.tv.id).subscribe(item => {
          if (!item) {
            this.isMediaInWatchList = false;
          } else {
            this.isMediaInWatchList = true;
            this.watchlistItem = item;
          }
        })
      );
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

  addToWatchlist(status: TvShowWatchListStatus) {
    if (this.tv) {
      this.subscriptions.push(
        this.watchlistService
          .createWatchlistItem({
            status,
            tvShowId: this.tv.id,
          })
          .subscribe(() => {
            this.notificationsService.success(
              'La série a été ajouté aux séries suivis'
            );
            this.isMediaInWatchList = true;
            this.watchlistItem = {
              tvShowId: this.tv!.id,
              status,
            };
          })
      );
    }
  }

  changeShowStatus(status: TvShowWatchListStatus) {
    this.watchlistItem!.status = status;
    this.subscriptions.push(
      this.watchlistService
        .updateWatchlistItem(this.watchlistItem!)
        .subscribe(() =>
          this.notificationsService.success('Liste de suivie modifié')
        )
    );
  }

  removeShowWatchlist() {
    this.subscriptions.push(
      this.watchlistService
        .removeFromWatchlist(this.watchlistItem!.tvShowId)
        .subscribe(() => {
          this.isMediaInWatchList = false;
          this.watchlistItem = undefined;
          this.notificationsService.success(
            'La série a été retiré des séries suivis'
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
