import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsWatchStatsComponent } from './statistics-watch-stats/statistics-watch-stats.component';
import { StatisticsHistoryComponent } from './statistics-history/statistics-history.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { StatsDailyViewsComponent } from '../../shared/components/stats-daily-views/stats-daily-views.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [
    StatisticsWatchStatsComponent,
    StatisticsHistoryComponent,
    StatsDailyViewsComponent,
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgChartsModule,
    NzGridModule,
  ],
})
export class StatisticsModule {}
