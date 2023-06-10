import { Component, OnInit } from '@angular/core';
import { EpisodeStatisticsService } from '../episode-statistics.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Store } from '@ngxs/store';
import { MovieStatisticsService } from '../movie-statistics.service';
import { Statistic } from '../../../shared/models/statistic.models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-statistics-watch-stats',
  templateUrl: './statistics-watch-stats.component.html',
  styleUrls: ['./statistics-watch-stats.component.less'],
})
export class StatisticsWatchStatsComponent implements OnInit {
  stats: Statistic[] = [];

  constructor(
    private episodeStatisticsService: EpisodeStatisticsService,
    private movieStatisticsService: MovieStatisticsService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (userId) {
      forkJoin([
        this.episodeStatisticsService.getStatisticsByUserId(userId),
        this.movieStatisticsService.getStatisticsByUserId(userId),
      ]).subscribe(([episodeStats, movieStats]) => {
        this.stats = [...episodeStats, ...movieStats];
      });
    }
  }
}
