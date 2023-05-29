import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamComponent } from './stream/stream.component';
import { VideoPlayerModule } from '../../feature/streaming/video-player.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgxsModule } from '@ngxs/store';
import { StreamingState } from '../../feature/streaming/store/streaming.state';

@NgModule({
  declarations: [StreamComponent],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    VideoPlayerModule,
    NzGridModule,
    NzSpinModule,
    NzAlertModule,
    NzCardModule,
  ],
})
export class StreamingModule {}
