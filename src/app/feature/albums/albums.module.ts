import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsService } from './albums.service';
import { NgxsModule } from '@ngxs/store';
import { AlbumsState } from './store/albums.state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([AlbumsState])],
  providers: [AlbumsService],
})
export class AlbumsModule {}
