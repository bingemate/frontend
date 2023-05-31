import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AlbumsState } from './albums/store/albums.state';
import { AlbumsService } from './albums/albums.service';
import { StreamingState } from './streaming/store/streaming.state';
import { PlaylistState } from './playlist/store/playlist.state';
import { PlaylistModule } from './playlist/playlist.module';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([AlbumsState]),
    NgxsModule.forFeature([StreamingState]),
    PlaylistModule,
  ],
  providers: [AlbumsService],
})
export class FeaturesModule {}
