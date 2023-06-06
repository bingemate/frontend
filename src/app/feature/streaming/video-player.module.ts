import { NgModule } from '@angular/core';
import { CommonModule, NgIf, NgOptimizedImage } from '@angular/common';
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
import { PlaylistStreamComponent } from './playlist-stream/playlist-stream.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NzListModule } from 'ng-zorro-antd/list';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [VideoPlayerComponent, PlaylistStreamComponent],
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
    NzSwitchModule,
    FormsModule,
    NzSpaceModule,
    CdkDrag,
    CdkDropList,
    NgOptimizedImage,
    NzListModule,
    CdkFixedSizeVirtualScroll,
  ],
  exports: [VideoPlayerComponent, PlaylistStreamComponent],
})
export class VideoPlayerModule {}
