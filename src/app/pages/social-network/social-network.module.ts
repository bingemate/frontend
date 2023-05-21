import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialNetworkRoutingModule } from './social-network-routing.module';
import { SocialNetworkHomeComponent } from './social-network-home/social-network-home.component';
import { MediaInfoModule } from '../../feature/media-info/media-info.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { MovieViewComponent } from './movie-view/movie-view.component';

@NgModule({
  declarations: [SocialNetworkHomeComponent, MovieViewComponent],
  imports: [
    CommonModule,
    SocialNetworkRoutingModule,
    MediaInfoModule,
    NzDividerModule,
    NzLayoutModule,
    NzIconModule,
    NzPageHeaderModule,
    NzCollapseModule,
    NzPaginationModule,
    NzSkeletonModule,
  ],
})
export class SocialNetworkModule {}
