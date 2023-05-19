import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamComponent } from './stream/stream.component';
import { VideoPlayerModule } from '../../feature/streaming/video-player.module';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [StreamComponent],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    VideoPlayerModule,
    NzGridModule,
  ],
})
export class StreamingModule {}
