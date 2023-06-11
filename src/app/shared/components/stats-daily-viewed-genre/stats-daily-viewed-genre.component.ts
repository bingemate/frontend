import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { getDateDays } from '../../utils/date.utils';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { catchError, forkJoin, map } from 'rxjs';
import { Genre } from '../../models/media.models';
import { StatDisplay, Statistic } from '../../models/statistic.models';

@Component({
  selector: 'app-stats-daily-viewed-genre',
  templateUrl: './stats-daily-viewed-genre.component.html',
  styleUrls: ['./stats-daily-viewed-genre.component.less'],
})
export class StatsDailyViewedGenreComponent implements OnInit, OnChanges {
  @Input()
  stats: Statistic[] = [];

  sevenDays: StatDisplay = { data: [], labels: [] };
  oneMonth: StatDisplay = { data: [], labels: [] };
  sixMonth: StatDisplay = { data: [], labels: [] };
  readonly lineChartType: ChartType = 'radar';
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

  constructor(private mediaService: MediaInfoService) {}

  ngOnInit(): void {
    this.updateData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats'].currentValue !== changes['stats'].previousValue) {
      this.updateData();
    }
  }

  setDailyViewSevenDaysPeriod() {
    this.selectedPeriod = '7 jours';
    this.updateChartData(this.sevenDays);
  }

  setDailyViewMonthPeriod() {
    this.selectedPeriod = '1 mois';
    this.updateChartData(this.oneMonth);
  }

  setDailyViewSemesterPeriod() {
    this.selectedPeriod = '6 mois';
    this.updateChartData(this.sixMonth);
  }

  private updateChartData(stats: StatDisplay): void {
    this.lineChartData = {
      datasets: [
        {
          data: stats.data,
        },
      ],
      labels: stats.labels,
    };
  }

  private updateData() {
    forkJoin(
      this.stats.map(stat =>
        this.mediaService.getTvShowShortInfo(stat.mediaId).pipe(
          map(media => ({
            stat,
            media,
          })),
          catchError(() => {
            return this.mediaService.getMovieShortInfo(stat.mediaId).pipe(
              map(media => ({
                stat,
                media,
              }))
            );
          })
        )
      )
    ).subscribe(stats => {
      this.sevenDays = this.getPeriodData(stats, 7);
      this.oneMonth = this.getPeriodData(stats, 30);
      this.sixMonth = this.getPeriodData(stats, 180);
      if (this.selectedPeriod === '7 jours') {
        this.setDailyViewSevenDaysPeriod();
      } else if (this.selectedPeriod === '1 mois') {
        this.setDailyViewMonthPeriod();
      } else {
        this.setDailyViewSemesterPeriod();
      }
    });
  }

  private getPeriodData(
    stats: readonly { stat: Statistic; media: any }[],
    period: number
  ) {
    let statsFiltered = stats.filter(
      stat =>
        getDateDays(new Date().getTime()) -
          getDateDays(stat.stat.startedAt.getTime()) <=
        period
    );
    statsFiltered = statsFiltered.sort(
      (a, b) => a.stat.startedAt.getTime() - b.stat.startedAt.getTime()
    );
    const watchTimePerDay = this.getWatchTimePerDay(statsFiltered);
    const labels = Array.from(watchTimePerDay.keys());
    const data = Array.from(watchTimePerDay.values());
    return { labels, data };
  }

  private getWatchTimePerDay(stats: { stat: Statistic; media: any }[]) {
    const data: Map<string, number> = new Map<string, number>();
    stats.forEach(stat => {
      stat.media.genres.forEach((genre: Genre) => {
        const value = data.get(genre.name);
        if (!data.has(genre.name) || !value) {
          data.set(genre.name, 1);
        } else {
          data.set(genre.name, value + 1);
        }
      });
    });
    return data;
  }
}
