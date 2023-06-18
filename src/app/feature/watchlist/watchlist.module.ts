import { NgModule } from '@angular/core';
import { TvShowWatchlistService } from './tv-show-watchlist.service';
import { MovieWatchlistService } from './movie-watchlist.service';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [],
  providers: [TvShowWatchlistService, MovieWatchlistService],
})
export class WatchlistModule {}
