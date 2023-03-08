import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasMediaListComponent } from './medias-media-list/medias-media-list.component';
import { MediasRoutingModule } from './medias-routing.module';

@NgModule({
  declarations: [MediasMediaListComponent],
  imports: [CommonModule, MediasRoutingModule],
})
export class MediasModule {}
