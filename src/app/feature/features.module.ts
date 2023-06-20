import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { PlaylistModule } from './playlist/playlist.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { StreamingState } from './streaming/store/streaming.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([StreamingState]),
    PlaylistModule,
    WatchlistModule,
  ],
  providers: [],
})
export class FeaturesModule {}
