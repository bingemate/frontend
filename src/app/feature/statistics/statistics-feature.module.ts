import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeStatisticsService } from './episode-statistics.service';
import { MovieStatisticsService } from './movie-statistics.service';
import { StatisticViewComponent } from './components/statistic-view/statistic-view.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SharedModule } from '../../shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StatsDailyViewedMediasComponent } from './components/stats-daily-viewed-medias/stats-daily-viewed-medias.component';
import { StatsDailySentCommentsComponent } from './components/stats-daily-sent-comments/stats-daily-sent-comments.component';
import { StatsDailyViewsComponent } from './components/stats-daily-views/stats-daily-views.component';
import { StatsMovieDailyViewedGenreComponent } from './components/stats-movie-daily-viewed-genre/stats-movie-daily-viewed-genre.component';
import { StatsShowDailyViewedGenreComponent } from './components/stats-show-daily-viewed-genre/stats-show-daily-viewed-genre.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    StatisticViewComponent,
    StatsDailyViewedMediasComponent,
    StatsDailySentCommentsComponent,
    StatsDailyViewsComponent,
    StatsShowDailyViewedGenreComponent,
    StatsMovieDailyViewedGenreComponent,
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzStatisticModule,
    NzCardModule,
    SharedModule,
    NzIconModule,
    NzButtonModule,
    NzDropDownModule,
    NgChartsModule,
  ],
  providers: [EpisodeStatisticsService, MovieStatisticsService],
  exports: [StatisticViewComponent],
})
export class StatisticsFeatureModule {}
