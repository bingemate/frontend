import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCalendarComponent } from './components/media-calendar/media-calendar.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterLink } from '@angular/router';
import { CalendarLinksComponent } from './components/calendar-links/calendar-links.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@NgModule({
  declarations: [MediaCalendarComponent, CalendarLinksComponent],
  imports: [
    CommonModule,
    NzBadgeModule,
    NzCalendarModule,
    NzToolTipModule,
    RouterLink,
    NzTypographyModule,
    NzDescriptionsModule,
  ],
  exports: [MediaCalendarComponent, CalendarLinksComponent],
})
export class CalendarModule {}
