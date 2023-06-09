import { NgModule } from '@angular/core';
import { MoviePlaylistsService } from './movie-playlists.service';
import { NgxsModule } from '@ngxs/store';
import { PlaylistState } from './store/playlist.state';
import { EpisodePlaylistsService } from './episode-playlists.service';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([PlaylistState])],
  providers: [MoviePlaylistsService, EpisodePlaylistsService],
})
export class PlaylistModule {}
