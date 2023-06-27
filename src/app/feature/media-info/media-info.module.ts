import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MediaInfoComponent } from './components/media-info/media-info.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { MovieInfoCardComponent } from './components/movie-info-card/movie-info-card.component';
import { TvInfoComponent } from './components/tv-info/tv-info.component';
import { TvInfoCardComponent } from './components/tv-info-card/tv-info-card.component';
import { EpisodeInfoListComponent } from './components/episode-info-list/episode-info-list.component';
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
import { ActorInfoComponent } from './components/actor-info/actor-info.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MediaListComponent } from './components/media-list/media-list.component';
import { SharedModule } from '../../shared/shared.module';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@NgModule({
  declarations: [
    MediaInfoComponent,
    MovieInfoComponent,
    MovieInfoCardComponent,
    TvInfoComponent,
    TvInfoCardComponent,
    EpisodeInfoListComponent,
    MovieListComponent,
    TvListComponent,
    ActorInfoComponent,
    MediaListComponent,
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
    NzTabsModule,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    NzSpaceModule,
    NzTypographyModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzToolTipModule,
    SharedModule,
    NzProgressModule,
  ],
  exports: [
    MediaInfoComponent,
    MovieInfoCardComponent,
    TvInfoCardComponent,
    EpisodeInfoListComponent,
    MovieListComponent,
    TvListComponent,
    MovieInfoComponent,
    ActorInfoComponent,
    TvInfoComponent,
    MediaListComponent,
  ],
})
export class MediaInfoModule {}
