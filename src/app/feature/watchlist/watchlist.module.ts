import { NgModule } from '@angular/core';
import { TvShowWatchlistService } from './tv-show-watchlist.service';
import { MovieWatchlistService } from './movie-watchlist.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [TvShowWatchlistService, MovieWatchlistService],
})
export class WatchlistModule {}
