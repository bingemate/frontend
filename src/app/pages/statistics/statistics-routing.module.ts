import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { StatisticsWatchStatsComponent } from './statistics-watch-stats/statistics-watch-stats.component';
import { StatisticsHistoryComponent } from './statistics-history/statistics-history.component';

export const statisticsLinks: NavigationLinks<'watch_stats' | 'history'> = {
  watch_stats: {
    name: 'Watch Stats',
    path: 'watch-stats',
  },
  history: {
    name: 'History',
    path: 'history',
  },
};

const routes: Routes = [
  {
    path: statisticsLinks.watch_stats.path,
    component: StatisticsWatchStatsComponent,
  },
  {
    path: statisticsLinks.history.path,
    component: StatisticsHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialNetworkRoutingModule {}
