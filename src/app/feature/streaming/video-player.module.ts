import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { VgModuloModule } from '@videogular/ngx-videogular/modulo';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RouterLink } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { StreamingState } from './store/streaming.state';

@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    NzCardModule,
    NgIf,
    VgBufferingModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgModuloModule,
    NzIconModule,
    NzSelectModule,
    RouterLink,
  ],
  exports: [VideoPlayerComponent],
})
export class VideoPlayerModule {}
