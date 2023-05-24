import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsWatchStatsComponent } from './statistics-watch-stats/statistics-watch-stats.component';
import { StatisticsHistoryComponent } from './statistics-history/statistics-history.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { StatsDailyViewsComponent } from '../../shared/components/stats-daily-views/stats-daily-views.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { StatsDailyViewedMediasComponent } from '../../shared/components/stats-daily-viewed-medias/stats-daily-viewed-medias.component';
import { StatisticsService } from './statistics.service';

@NgModule({
  declarations: [
    StatisticsWatchStatsComponent,
    StatisticsHistoryComponent,
    StatsDailyViewedMediasComponent,
    StatsDailyViewsComponent,
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgChartsModule,
    NzGridModule,
    NzSpaceModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
  ],
  providers: [StatisticsService],
})
export class StatisticsModule {}
