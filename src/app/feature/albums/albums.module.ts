import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AlbumsState } from './store/albums.state';
import { AlbumsService } from './albums.service';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([AlbumsState])],
  providers: [AlbumsService],
})
export class AlbumsModule {}
