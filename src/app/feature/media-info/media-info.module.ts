import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MediaInfoComponent } from './components/media-info/media-info.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { MovieInfoCardComponent } from './components/movie-info-card/movie-info-card.component';
import { TvInfoComponent } from './components/tv-info/tv-info.component';
import { TvInfoCardComponent } from './components/tv-info-card/tv-info-card.component';
import { EpisodeInfoComponent } from './components/episode-info/episode-info.component';
import { EpisodeInfoCardComponent } from './components/episode-info-card/episode-info-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TvListComponent } from './components/tv-list/tv-list.component';

@NgModule({
  declarations: [
    MediaInfoComponent,
    MovieInfoComponent,
    MovieInfoCardComponent,
    TvInfoComponent,
    TvInfoCardComponent,
    EpisodeInfoComponent,
    EpisodeInfoCardComponent,
    MovieListComponent,
    TvListComponent,
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzIconModule,
    NgOptimizedImage,
    NzImageModule,
    NzGridModule,
    NzDividerModule,
  ],
  exports: [
    MediaInfoComponent,
    MovieInfoCardComponent,
    TvInfoCardComponent,
    EpisodeInfoCardComponent,
    MovieListComponent,
    TvListComponent,
  ],
})
export class MediaInfoModule {}
