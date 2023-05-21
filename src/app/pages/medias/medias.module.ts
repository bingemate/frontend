import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasMediaListComponent } from './medias-media-list/medias-media-list.component';
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

@NgModule({
  declarations: [
    MediasMediaListComponent,
    TrendingComponent,
    MovieViewComponent,
    MovieByGenreComponent,
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
  ],
})
export class MediasModule {}
