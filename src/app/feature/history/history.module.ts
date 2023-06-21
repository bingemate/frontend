import { NgModule } from '@angular/core';
import { EpisodeHistoryService } from './episode-history.service';
import { HistoryService } from './history.service';
import { MovieHistoryService } from './movie-history.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [EpisodeHistoryService, MovieHistoryService, HistoryService],
})
export class HistoryModule {}
