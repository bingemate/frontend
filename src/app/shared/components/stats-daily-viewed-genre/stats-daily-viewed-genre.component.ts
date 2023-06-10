import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { getDateDays } from '../../utils/date.utils';
import { Statistic } from '../../models/statistic.models';

@Component({
  selector: 'app-stats-daily-viewed-genre',
  templateUrl: './stats-daily-viewed-genre.component.html',
  styleUrls: ['./stats-daily-viewed-genre.component.less'],
})
export class StatsDailyViewedGenreComponent implements OnInit {
  @Input()
  stats: Statistic[] = [];
  readonly lineChartType: ChartType = 'pie';
  readonly lineChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  selectedPeriod = '7 jours';
  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };

  ngOnInit(): void {
    this.setDailyViewSevenDaysPeriod();
  }

  setDailyViewSevenDaysPeriod() {
    this.selectedPeriod = '7 jours';
    this.setChartData(7);
  }

  setDailyViewMonthPeriod() {
    this.selectedPeriod = '1 mois';
    this.setChartData(30);
  }

  setDailyViewSemesterPeriod() {
    this.selectedPeriod = '6 mois';
    this.setChartData(180);
  }

  private updateChartData(data: number[], labels: string[]): void {
    this.lineChartData = {
      datasets: [
        {
          data,
        },
      ],
      labels,
    };
  }

  private setChartData(period: number) {
    let stats = this.stats.filter(
      stat =>
        getDateDays(new Date().getTime()) -
          getDateDays(stat.startedAt.getTime()) <=
        period
    );
    stats = stats.sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime());
    const watchTimePerDay = this.getWatchTimePerDay(stats);
    const labels = Array.from(watchTimePerDay.keys());
    const data = Array.from(watchTimePerDay.values());
    this.updateChartData(data, labels);
  }

  private getWatchTimePerDay(stats: Statistic[]) {
    const data: Map<string, number> = new Map<string, number>();
    stats.forEach(stat => {
      const key = 'Genre'; // TODO get media genre
      const value = data.get(key);
      if (!data.has(key) || !value) {
        data.set(key, 1);
      } else {
        data.set(key, value + 1);
      }
    });
    return data;
  }
}
