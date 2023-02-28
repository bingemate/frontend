import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsWatchStatsComponent } from './statistics-watch-stats/statistics-watch-stats.component';
import { StatisticsHistoryComponent } from './statistics-history/statistics-history.component';

@NgModule({
  declarations: [StatisticsWatchStatsComponent, StatisticsHistoryComponent],
  imports: [CommonModule],
})
export class StatisticsModule {}
