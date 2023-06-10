import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AlbumsState } from './albums/store/albums.state';
import { AlbumsService } from './albums/albums.service';
import { PlaylistModule } from './playlist/playlist.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { StreamingState } from './streaming/store/streaming.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([AlbumsState]),
    NgxsModule.forFeature([StreamingState]),
    PlaylistModule,
    WatchlistModule,
  ],
  providers: [AlbumsService],
})
export class FeaturesModule {}
