import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  declarations: [WatchlistComponent, WatchtlistCalendarComponent],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    NzPageHeaderModule,
    NzCalendarModule,
    NzBadgeModule,
    NzPopoverModule,
    NzLayoutModule,
    NzGridModule,
    SharedModule,
    NzSpaceModule,
    NzTypographyModule,
  ],
})
export class WatchlistModule {}
