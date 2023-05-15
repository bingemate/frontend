import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics-watch-stats',
  templateUrl: './statistics-watch-stats.component.html',
  styleUrls: ['./statistics-watch-stats.component.less'],
})
export class StatisticsWatchStatsComponent {
  dailyViewPeriod = '7 jours';

  setDailyViewSevenDaysPeriod() {
    this.dailyViewPeriod = '7 jours';
  }

  setDailyViewMonthPeriod() {
    this.dailyViewPeriod = '1 mois';
  }

  setDailyViewSemesterPeriod() {
    this.dailyViewPeriod = '6 mois';
  }
}
