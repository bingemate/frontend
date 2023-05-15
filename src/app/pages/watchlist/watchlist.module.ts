import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistComponent } from './watchtlist/watchlist.component';
import { WatchtlistCalendarComponent } from './watchtlist-calendar/watchtlist-calendar.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SharedModule } from '../../shared/shared.module';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PlaylistsComponent } from './playlists/playlists.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { PlaylistComponent } from './playlist/playlist.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    WatchlistComponent,
    WatchtlistCalendarComponent,
    PlaylistsComponent,
    PlaylistComponent,
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzCalendarModule,
    NzBadgeModule,
    NzPopoverModule,
    NzLayoutModule,
    NzGridModule,
    SharedModule,
    NzSpaceModule,
    NzTypographyModule,
    NzDropDownModule,
    NzListModule,
    NzSkeletonModule,
    CdkDropList,
    CdkDrag,
    NgOptimizedImage,
    NzModalModule,
    NzButtonModule,
    FormsModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
  ],
})
export class WatchlistModule {}
