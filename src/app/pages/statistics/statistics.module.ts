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
import { EpisodeStatisticsService } from './episode-statistics.service';
import { StatsShowDailyViewedGenreComponent } from '../../shared/components/stats-show-daily-viewed-genre/stats-show-daily-viewed-genre.component';
import { MediaInfoModule } from '../../feature/media-info/media-info.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { MovieStatisticsService } from './movie-statistics.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SharedModule } from '../../shared/shared.module';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { StatsMovieDailyViewedGenreComponent } from '../../shared/components/stats-movie-daily-viewed-genre/stats-movie-daily-viewed-genre.component';

@NgModule({
  declarations: [
    StatisticsWatchStatsComponent,
    StatisticsHistoryComponent,
    StatsDailyViewedMediasComponent,
    StatsDailyViewsComponent,
    StatsShowDailyViewedGenreComponent,
    StatsMovieDailyViewedGenreComponent,
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
    MediaInfoModule,
    NzListModule,
    NzProgressModule,
    NzTypographyModule,
    NzCardModule,
    SharedModule,
    NzStatisticModule,
  ],
  providers: [EpisodeStatisticsService, MovieStatisticsService],
})
export class StatisticsModule {}
