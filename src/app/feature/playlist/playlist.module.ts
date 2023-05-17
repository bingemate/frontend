import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { PlaylistsService } from './playlists.service';
import { PlaylistsState } from './store/playlists.state';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([PlaylistsState])],
  providers: [PlaylistsService],
})
export class PlaylistModule {}
