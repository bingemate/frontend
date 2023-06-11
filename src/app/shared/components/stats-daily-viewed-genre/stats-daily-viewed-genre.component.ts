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
import { forkJoin, map, switchMap } from 'rxjs';
import { Genre } from '../../models/media.models';
import { StatDisplay, Statistic } from '../../models/statistic.models';

@Component({
  selector: 'app-stats-daily-viewed-genre',
  templateUrl: './stats-daily-viewed-genre.component.html',
  styleUrls: ['./stats-daily-viewed-genre.component.less'],
})
export class StatsDailyViewedGenreComponent implements OnInit, OnChanges {
  @Input()
  movieStats: Statistic[] = [];
  @Input()
  episodeStats: Statistic[] = [];

  sevenTvDays: StatDisplay = { data: [], labels: [] };
  oneTvMonth: StatDisplay = { data: [], labels: [] };
  sixTvMonth: StatDisplay = { data: [], labels: [] };
  sevenMovieDays: number[] = [];
  oneMovieMonth: number[] = [];
  sixMovieMonth: number[] = [];
  readonly lineChartType: ChartType = 'radar';
  readonly lineChartOptions: ChartConfiguration['options'] = {};

  selectedPeriod = '7 jours';
  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };

  constructor(private mediaService: MediaInfoService) {}

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

  private updateChartData(stats: StatDisplay, movieData: number[]): void {
    this.lineChartData = {
      datasets: [
        {
          label: 'Séries',
          data: stats.data,
        },
        {
          label: 'Films',
          data: movieData,
        },
      ],
      labels: stats.labels,
    };
  }

  private updateMovieData() {
    forkJoin(
      this.movieStats.map(stat =>
        this.mediaService.getMovieShortInfo(stat.mediaId).pipe(
          map(media => ({
            stat,
            media,
          }))
        )
      )
    ).subscribe(stats => {
      this.sevenMovieDays = this.getPeriodData(stats, 7).data;
      this.oneMovieMonth = this.getPeriodData(stats, 30).data;
      this.sixMovieMonth = this.getPeriodData(stats, 180).data;
      if (this.selectedPeriod === '7 jours') {
        this.setDailyViewSevenDaysPeriod();
      } else if (this.selectedPeriod === '1 mois') {
        this.setDailyViewMonthPeriod();
      } else {
        this.setDailyViewSemesterPeriod();
      }
    });
  }

  private updateTvData() {
    forkJoin(
      this.episodeStats.map(stat =>
        this.mediaService.getTvShowEpisodeInfoById(stat.mediaId).pipe(
          switchMap(episode =>
            this.mediaService.getTvShowShortInfo(episode.tvShowId)
          ),
          map(media => ({
            stat,
            media,
          }))
        )
      )
    ).subscribe(stats => {
      this.sevenTvDays = this.getPeriodData(stats, 7);
      this.oneTvMonth = this.getPeriodData(stats, 30);
      this.sixTvMonth = this.getPeriodData(stats, 180);
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
