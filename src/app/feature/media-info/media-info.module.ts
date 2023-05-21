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
import { RouterLink } from '@angular/router';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
    RouterLink,
    NzRateModule,
    FormsModule,
    NzSkeletonModule,
    NzDescriptionsModule,
    NzTagModule,
    NzListModule,
    NzAvatarModule,
    NzPaginationModule,
    NzBadgeModule,
    NzButtonModule,
  ],
  exports: [
    MediaInfoComponent,
    MovieInfoCardComponent,
    TvInfoCardComponent,
    EpisodeInfoCardComponent,
    MovieListComponent,
    TvListComponent,
    MovieInfoComponent,
  ],
})
export class MediaInfoModule {}
