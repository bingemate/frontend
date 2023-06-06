import { NgModule } from '@angular/core';
import { PlaylistsService } from './playlists.service';
import { NgxsModule } from '@ngxs/store';
import { PlaylistState } from './store/playlist.state';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([PlaylistState])],
  providers: [PlaylistsService],
})
export class PlaylistModule {}
