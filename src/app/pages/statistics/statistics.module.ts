import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsWatchStatsComponent } from './statistics-watch-stats/statistics-watch-stats.component';
import { StatisticsHistoryComponent } from './statistics-history/statistics-history.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MediaInfoModule } from '../../feature/media-info/media-info.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SharedModule } from '../../shared/shared.module';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { StatisticsFeatureModule } from '../../feature/statistics/statistics-feature.module';

@NgModule({
  declarations: [StatisticsWatchStatsComponent, StatisticsHistoryComponent],
  imports: [
    CommonModule,
    StatisticsFeatureModule,
    StatisticsRoutingModule,
    NgChartsModule,
    NzGridModule,
    NzSpaceModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    MediaInfoModule,
    NzListModule,
    NzProgressModule,
    NzTypographyModule,
    NzCardModule,
    SharedModule,
    NzStatisticModule,
    NzPopconfirmModule,
  ],
  providers: [],
  exports: [],
})
export class StatisticsModule {}
