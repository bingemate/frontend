import { Pipe, PipeTransform } from '@angular/core';
import { WatchListStatus } from '../models/watchlist.models';

@Pipe({
  name: 'watchlistStatus',
})
export class WatchlistStatusPipe implements PipeTransform {
  transform(value: WatchListStatus | string): string {
    switch (value) {
      case WatchListStatus.WATCHING:
        return 'En cours';
      case WatchListStatus.PLAN_TO_WATCH:
        return 'Prévu';
      case WatchListStatus.FINISHED:
        return 'Terminé';
      case WatchListStatus.ABANDONED:
        return 'Abandonné';
      default:
        return '';
    }
  }
}
