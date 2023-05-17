import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AlbumsState } from './albums/store/albums.state';
import { AlbumsService } from './albums/albums.service';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([AlbumsState])],
  providers: [AlbumsService],
})
export class FeaturesModule {}
