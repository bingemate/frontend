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
import { AddMediaStreamComponent } from './add-media-stream/add-media-stream.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

@NgModule({
  declarations: [
    VideoPlayerComponent,
    PlaylistStreamComponent,
    AddMediaStreamComponent,
  ],
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
    NzButtonModule,
    NzInputModule,
    NzAutocompleteModule,
  ],
  exports: [
    VideoPlayerComponent,
    PlaylistStreamComponent,
    AddMediaStreamComponent,
  ],
})
export class VideoPlayerModule {}
