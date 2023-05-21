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

@NgModule({
  declarations: [MediasMediaListComponent, TrendingComponent],
  imports: [
    CommonModule,
    MediasRoutingModule,
    NzPageHeaderModule,
    NzCollapseModule,
    NzSkeletonModule,
    MediaInfoModule,
    NzPaginationModule,
  ],
})
export class MediasModule {}
