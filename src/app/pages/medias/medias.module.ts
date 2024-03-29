import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasRoutingModule } from './medias-routing.module';
import { TrendingComponent } from './trending/trending.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { MediaInfoModule } from '../../feature/media-info/media-info.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { MovieByGenreComponent } from './movie-by-genre/movie-by-genre.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { MovieByActorComponent } from './movie-by-actor/movie-by-actor.component';
import { MovieByStudioComponent } from './movie-by-studio/movie-by-studio.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TvViewComponent } from './tv-view/tv-view.component';
import { TvByGenreComponent } from './tv-by-genre/tv-by-genre.component';
import { TvByNetworkComponent } from './tv-by-network/tv-by-network.component';
import { TvByActorComponent } from './tv-by-actor/tv-by-actor.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SearchComponent } from './media-search/search.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { MediaSearchModule } from '../../feature/media-search/media-search.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CommentModule } from '../../feature/comment/comment.module';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { RatingModule } from '../../feature/rating/rating.module';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { MediaByActorComponent } from './media-by-actor/media-by-actor.component';

@NgModule({
  declarations: [
    TrendingComponent,
    MovieViewComponent,
    MovieByGenreComponent,
    MovieByActorComponent,
    MovieByStudioComponent,
    TvViewComponent,
    TvByGenreComponent,
    TvByNetworkComponent,
    TvByActorComponent,
    SearchComponent,
    MediaByActorComponent,
  ],
  imports: [
    CommonModule,
    MediasRoutingModule,
    NzPageHeaderModule,
    NzCollapseModule,
    NzSkeletonModule,
    MediaInfoModule,
    NzPaginationModule,
    NzCardModule,
    NzGridModule,
    NzSpaceModule,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    NzListModule,
    CdkVirtualForOf,
    NzDividerModule,
    NzTabsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    NzProgressModule,
    NzEmptyModule,
    MediaSearchModule,
    NzCheckboxModule,
    CommentModule,
    NzRateModule,
    RatingModule,
    NzTypographyModule,
  ],
})
export class MediasModule {}
