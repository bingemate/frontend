import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  STAT_COLORS,
  StatDisplay,
  Statistic,
} from '../../../../shared/models/statistic.models';
import { getDateDays } from '../../../../shared/utils/date.utils';

@Component({
  selector: 'app-stats-daily-viewed-medias',
  templateUrl: './stats-daily-viewed-medias.component.html',
  styleUrls: ['./stats-daily-viewed-medias.component.less'],
})
export class StatsDailyViewedMediasComponent implements OnInit, OnChanges {
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
        ticks: {
          precision: 0,
        },
        position: 'left',
      },
    },
  };
  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };
  selectedPeriod = '7 jours';
  sevenTvDays: StatDisplay = { data: [], labels: [] };
  oneTvMonth: StatDisplay = { data: [], labels: [] };
  sixTvMonth: StatDisplay = { data: [], labels: [] };
  sevenMovieDays: number[] = [];
  oneMovieMonth: number[] = [];
  sixMovieMonth: number[] = [];

  ngOnInit(): void {
    this.updateMovieData();
    this.updateTvData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['movieStats'].currentValue !== changes['movieStats'].previousValue
    ) {
      this.updateMovieData();
    }
    if (
      changes['episodeStats'].currentValue !==
      changes['episodeStats'].previousValue
    ) {
      this.updateTvData();
    }
  }

  private updateMovieData() {
    this.sevenMovieDays = this.getPeriodData(this.movieStats, 7).data;
    this.oneMovieMonth = this.getPeriodData(this.movieStats, 30).data;
    this.sixMovieMonth = this.getPeriodData(this.movieStats, 180).data;
    if (this.selectedPeriod === '7 jours') {
      this.setDailyViewSevenDaysPeriod();
    } else if (this.selectedPeriod === '1 mois') {
      this.setDailyViewMonthPeriod();
    } else {
      this.setDailyViewSemesterPeriod();
    }
  }

  private updateTvData() {
    this.sevenTvDays = this.getPeriodData(this.episodeStats, 7);
    this.oneTvMonth = this.getPeriodData(this.episodeStats, 30);
    this.sixTvMonth = this.getPeriodData(this.episodeStats, 180);
    if (this.selectedPeriod === '7 jours') {
      this.setDailyViewSevenDaysPeriod();
    } else if (this.selectedPeriod === '1 mois') {
      this.setDailyViewMonthPeriod();
    } else {
      this.setDailyViewSemesterPeriod();
    }
  }

  setDailyViewSevenDaysPeriod() {
    this.selectedPeriod = '7 jours';
    this.updateChartData(this.sevenTvDays, this.sevenMovieDays);
  }

  setDailyViewMonthPeriod() {
    this.selectedPeriod = '1 mois';
    this.updateChartData(this.oneTvMonth, this.oneMovieMonth);
  }

  setDailyViewSemesterPeriod() {
    this.selectedPeriod = '6 mois';
    this.updateChartData(this.sixTvMonth, this.sixMovieMonth);
  }

  private updateChartData(tvData: StatDisplay, movieData: number[]): void {
    this.lineChartData = {
      datasets: [
        {
          data: tvData.data,
          label: 'Séries',
          fill: 'origin',
          ...STAT_COLORS.TV_SHOW_COLOR,
        },
        {
          data: movieData,
          label: 'Films',
          fill: 'origin',
          ...STAT_COLORS.MOVIE_COLOR,
        },
      ],
      labels: tvData.labels,
    };
  }

  private getPeriodData(stats: readonly Statistic[], period: number) {
    const dataMap: Map<string, number> = new Map<string, number>();
    const currentDate = new Date();
    currentDate.setDate(new Date().getDate() - period);
    while (currentDate.getTime() <= new Date().getTime()) {
      dataMap.set(format(new Date(currentDate), 'dd MMMM', { locale: fr }), 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    let statsFiltered = stats.filter(
      stat =>
        getDateDays(new Date().getTime()) -
          getDateDays(stat.startedAt.getTime()) <=
        period
    );
    statsFiltered = statsFiltered.sort(
      (a, b) => a.startedAt.getTime() - b.startedAt.getTime()
    );
    this.getWatchedMediasPerDay(statsFiltered, dataMap);
    const labels = Array.from(dataMap.keys());
    const data = Array.from(dataMap.values());
    return { data, labels };
  }

  private getWatchedMediasPerDay(
    stats: Statistic[],
    data: Map<string, number>
  ) {
    const ids: Map<string, Set<number>> = new Map<string, Set<number>>();
    stats.forEach(stat => {
      const key = format(stat.startedAt, 'dd MMMM', { locale: fr });
      let elements = ids.get(key);
      if (!elements) {
        elements = new Set();
        ids.set(key, elements);
      } else if (elements.has(stat.mediaId)) {
        return;
      }
      elements.add(stat.mediaId);
      const value = data.get(key);
      if (!data.has(key) || !value) {
        data.set(key, 1);
      } else {
        data.set(key, value + 1);
      }
    });
  }
}
