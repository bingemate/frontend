import { NgModule } from '@angular/core';
import { MoviePlaylistsService } from './movie-playlists.service';
import { NgxsModule } from '@ngxs/store';
import { PlaylistState } from './store/playlist.state';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([PlaylistState])],
  providers: [MoviePlaylistsService],
})
export class PlaylistModule {}
