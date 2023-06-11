import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { getDateDays, getDateHours } from '../../utils/date.utils';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import { Statistic } from '../../models/statistic.models';

@Component({
  selector: 'app-stats-daily-views',
  templateUrl: './stats-daily-views.component.html',
  styleUrls: ['./stats-daily-views.component.less'],
})
export class StatsDailyViewsComponent implements OnInit {
  @Input()
  movieStats: Statistic[] = [];
  @Input()
  episodeStats: Statistic[] = [];
  readonly lineChartType: ChartType = 'line';
  readonly lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
    },
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
          label: 'Temps de visionnage',
          backgroundColor: 'rgba(255, 113, 24, 0.3)',
          borderColor: 'rgb(255, 113, 24)',
          pointBackgroundColor: 'rgb(255, 113, 24)',
          fill: 'origin',
        },
      ],
      labels,
    };
  }

  private setChartData(period: number) {
    let stats = this.movieStats.filter(
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
      const key = format(stat.startedAt, 'dd MMMM', { locale: fr });
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
