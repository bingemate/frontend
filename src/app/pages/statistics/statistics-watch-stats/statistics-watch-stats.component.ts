import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Store } from '@ngxs/store';
import { Statistic } from '../../../shared/models/statistic';
import { getDateDays, getDateHours } from '../../../shared/utils/date.utils';

@Component({
  selector: 'app-statistics-watch-stats',
  templateUrl: './statistics-watch-stats.component.html',
  styleUrls: ['./statistics-watch-stats.component.less'],
})
export class StatisticsWatchStatsComponent implements OnInit {
  dailyViewPeriod = '7 jours';
  labels: string[] = [];
  data: number[] = [];
  private stats: Statistic[] = [];

  constructor(
    private statService: StatisticsService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (userId) {
      this.statService.getStatisticsByUserId(userId).subscribe(stats => {
        this.stats = stats;
        this.setDailyViewSevenDaysPeriod();
      });
    }
  }

  setDailyViewSevenDaysPeriod() {
    this.dailyViewPeriod = '7 jours';
    this.setChartData(7);
  }

  private setChartData(period: number) {
    let stats = this.stats.filter(
      stat =>
        getDateDays(new Date().getTime()) -
          getDateDays(stat.startedAt.getTime()) <=
        period
    );
    stats = stats.sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime());
    const data = this.getWatchTimePerDay(stats);
    this.labels = Array.from(data.keys());
    this.data = Array.from(data.values());
  }

  setDailyViewMonthPeriod() {
    this.dailyViewPeriod = '1 mois';
    this.setChartData(30);
  }

  setDailyViewSemesterPeriod() {
    this.dailyViewPeriod = '6 mois';
    this.setChartData(180);
  }

  private getWatchTimePerDay(stats: Statistic[]) {
    const data: Map<string, number> = new Map<string, number>();
    stats.forEach(stat => {
      const key = `${stat.startedAt.getDay()}/${stat.startedAt.getMonth()}`;
      const value = data.get(key);
      if (!data.has(key) || !value) {
        data.set(
          key,
          getDateHours(stat.stoppedAt.getTime() - stat.startedAt.getTime())
        );
      } else {
        data.set(
          key,
          value +
            getDateHours(stat.stoppedAt.getTime() - stat.startedAt.getTime())
        );
      }
    });
    return data;
  }
}
