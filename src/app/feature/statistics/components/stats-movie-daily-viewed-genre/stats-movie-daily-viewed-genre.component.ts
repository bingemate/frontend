import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { map, Subscription } from 'rxjs';
import { MediaInfoService } from '../../../media-info/media-info.service';
import {
  STAT_COLORS,
  StatDisplay,
  Statistic,
} from '../../../../shared/models/statistic.models';
import { getDateDays } from '../../../../shared/utils/date.utils';
import { Genre, MovieResponse } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-stats-movie-daily-viewed-genre',
  templateUrl: './stats-movie-daily-viewed-genre.component.html',
  styleUrls: ['./stats-movie-daily-viewed-genre.component.less'],
})
export class StatsMovieDailyViewedGenreComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input()
  movieStats: Statistic[] = [];

  sevenMovieDays: StatDisplay = { data: [], labels: [] };
  oneMovieMonth: StatDisplay = { data: [], labels: [] };
  sixMovieMonth: StatDisplay = { data: [], labels: [] };
  readonly lineChartType: ChartType = 'radar';
  readonly lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      r: {
        grid: {
          color: 'rgba(255, 140, 0, 0.2)',
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
        ticks: {
          precision: 0,
          display: false,
        },
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

  subscriptions: Subscription[] = [];

  constructor(private mediaService: MediaInfoService) {}

  ngOnInit(): void {
    this.updateMovieData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['movieStats'].currentValue !== changes['movieStats'].previousValue
    ) {
      this.updateMovieData();
    }
  }

  setDailyViewSevenDaysPeriod() {
    this.selectedPeriod = '7 jours';
    this.updateChartData(this.sevenMovieDays);
  }

  setDailyViewMonthPeriod() {
    this.selectedPeriod = '1 mois';
    this.updateChartData(this.oneMovieMonth);
  }

  setDailyViewSemesterPeriod() {
    this.selectedPeriod = '6 mois';
    this.updateChartData(this.sixMovieMonth);
  }

  private updateChartData(movieData: StatDisplay): void {
    this.lineChartData = {
      datasets: [
        {
          data: movieData.data,
          fill: true,
          ...STAT_COLORS.MOVIE_COLOR,
        },
      ],
      labels: movieData.labels,
    };
  }

  private updateMovieData() {
    /*forkJoin(
      this.movieStats.map(stat =>
        this.mediaService.getMovieShortInfo(stat.mediaId).pipe(
          map(media => ({
            stat,
            media,
          }))
        )
      )
    )*/
    const mediaIds = this.movieStats.map(stat => stat.mediaId);
    this.subscriptions.push(
      this.mediaService
        .getMoviesShortInfo(mediaIds)
        .pipe(
          map(medias => {
            return medias.map(media => {
              const stat = this.movieStats.find(
                stat => stat.mediaId === media.id
              )!;
              return { stat, media };
            });
          })
        )
        .subscribe(stats => {
          this.sevenMovieDays = this.getPeriodData(stats, 7);
          this.oneMovieMonth = this.getPeriodData(stats, 30);
          this.sixMovieMonth = this.getPeriodData(stats, 180);
          if (this.selectedPeriod === '7 jours') {
            this.setDailyViewSevenDaysPeriod();
          } else if (this.selectedPeriod === '1 mois') {
            this.setDailyViewMonthPeriod();
          } else {
            this.setDailyViewSemesterPeriod();
          }
        })
    );
  }

  private getPeriodData(
    stats: readonly { stat: Statistic; media: MovieResponse }[],
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

  private getWatchTimePerDay(
    stats: { stat: Statistic; media: MovieResponse }[]
  ) {
    const data: Map<string, number> = new Map<string, number>();
    const ids: Map<string, Set<number>> = new Map<string, Set<number>>();
    stats.forEach(stat => {
      stat.media.genres.forEach((genre: Genre) => {
        let elements = ids.get(genre.name);
        if (!elements) {
          elements = new Set();
          ids.set(genre.name, elements);
        } else if (elements.has(stat.stat.mediaId)) {
          return;
        }
        elements.add(stat.stat.mediaId);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
