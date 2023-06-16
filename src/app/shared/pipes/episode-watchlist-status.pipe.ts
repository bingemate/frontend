import { Pipe, PipeTransform } from '@angular/core';
import { TvShowWatchListStatus } from '../models/tv-show-watchlist.models';

@Pipe({
  name: 'tvShowWatchlistStatus',
})
export class TvShowWatchlistStatusPipe implements PipeTransform {
  transform(value: TvShowWatchListStatus | string): string {
    switch (value) {
      case TvShowWatchListStatus.WATCHING:
        return 'En cours';
      case TvShowWatchListStatus.PLAN_TO_WATCH:
        return 'Prévu';
      case TvShowWatchListStatus.FINISHED:
        return 'Terminé';
      case TvShowWatchListStatus.ABANDONED:
        return 'Abandonné';
      default:
        return '';
    }
  }
}
