import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AlbumsState } from './albums/store/albums.state';
import { AlbumsService } from './albums/albums.service';
import { PlaylistsState } from "./playlist/store/playlists.state";
import { PlaylistsService } from "./playlist/playlists.service";

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([AlbumsState, PlaylistsState])],
  providers: [AlbumsService, PlaylistsService],
})
export class FeaturesModule {}
