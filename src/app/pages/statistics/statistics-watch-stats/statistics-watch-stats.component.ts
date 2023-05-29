import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Store } from '@ngxs/store';
import { Statistic } from '../../../shared/models/statistic';

@Component({
  selector: 'app-statistics-watch-stats',
  templateUrl: './statistics-watch-stats.component.html',
  styleUrls: ['./statistics-watch-stats.component.less'],
})
export class StatisticsWatchStatsComponent implements OnInit {
  stats: Statistic[] = [];

  constructor(
    private statService: StatisticsService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    if (userId) {
      this.statService.getStatisticsByUserId(userId).subscribe(stats => {
        this.stats = stats;
      });
    }
  }
}
