import { Pipe, PipeTransform } from '@angular/core';
import { MovieWatchListStatus } from '../models/movie-watchlist.models';

@Pipe({
  name: 'movieWatchlistStatus',
})
export class MovieWatchlistStatusPipe implements PipeTransform {
  transform(value: MovieWatchListStatus | string): string {
    switch (value) {
      case MovieWatchListStatus.WATCHING:
        return 'En cours';
      case MovieWatchListStatus.PLAN_TO_WATCH:
        return 'Prévu';
      case MovieWatchListStatus.FINISHED:
        return 'Terminé';
      case MovieWatchListStatus.ABANDONED:
        return 'Abandonné';
      default:
        return '';
    }
  }
}
