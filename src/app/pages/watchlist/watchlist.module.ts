import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchtlistComponent } from './watchtlist/watchtlist.component';
import { WatchtlistCalendarComponent } from './watchtlist-calendar/watchtlist-calendar.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@NgModule({
  declarations: [WatchtlistComponent, WatchtlistCalendarComponent],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    NzPageHeaderModule,
    NzCalendarModule,
    NzBadgeModule,
  ],
})
export class WatchlistModule {}
