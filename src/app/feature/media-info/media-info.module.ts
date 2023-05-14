import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaInfoService } from './media-info.service';
import { MediaInfoComponent } from './components/media-info/media-info.component';
import { MediaDiscoverService } from './media-discover.service';

@NgModule({
  declarations: [MediaInfoComponent],
  imports: [CommonModule],
  exports: [MediaInfoComponent],
})
export class MediaInfoModule {}
