import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { forkJoin, map, switchMap } from 'rxjs';
import {
  STAT_COLORS,
  StatDisplay,
  Statistic,
} from '../../../../shared/models/statistic.models';
import { MediaInfoService } from '../../../media-info/media-info.service';
import { getDateDays } from '../../../../shared/utils/date.utils';
import { Genre } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-stats-show-daily-viewed-genre',
  templateUrl: './stats-show-daily-viewed-genre.component.html',
  styleUrls: ['./stats-show-daily-viewed-genre.component.less'],
})
export class StatsShowDailyViewedGenreComponent implements OnInit, OnChanges {
  @Input()
  episodeStats: Statistic[] = [];

  sevenTvDays: StatDisplay = { data: [], labels: [] };
  oneTvMonth: StatDisplay = { data: [], labels: [] };
  sixTvMonth: StatDisplay = { data: [], labels: [] };
  readonly lineChartType: ChartType = 'radar';
  readonly lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      r: {
        ticks: {
          precision: 0,
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

  constructor(private mediaService: MediaInfoService) {}

  ngOnInit(): void {
    this.updateTvData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['episodeStats'].currentValue !==
      changes['episodeStats'].previousValue
    ) {
      this.updateTvData();
    }
  }

  setDailyViewSevenDaysPeriod() {
    this.selectedPeriod = '7 jours';
    this.updateChartData(this.sevenTvDays);
  }

  setDailyViewMonthPeriod() {
    this.selectedPeriod = '1 mois';
    this.updateChartData(this.oneTvMonth);
  }

  setDailyViewSemesterPeriod() {
    this.selectedPeriod = '6 mois';
    this.updateChartData(this.sixTvMonth);
  }

  private updateChartData(tvStats: StatDisplay): void {
    this.lineChartData = {
      datasets: [
        {
          data: tvStats.data,
          fill: true,
          ...STAT_COLORS.TV_SHOW_COLOR,
        },
      ],
      labels: tvStats.labels,
    };
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
}
