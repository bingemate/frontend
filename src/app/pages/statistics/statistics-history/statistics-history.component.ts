import { Component, OnDestroy, OnInit } from '@angular/core';
import { navigationRoot } from '../../../app-routing.module';
import { streamingLinks } from '../../streaming/streaming-routing.module';
import { Select } from '@ngxs/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { AuthState } from '../../../core/auth/store/auth.state';
import { EpisodeHistoryService } from '../../../feature/history/episode-history.service';
import { MovieHistoryService } from '../../../feature/history/movie-history.service';
import { HistoryModel } from '../../../shared/models/history.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-statistics-history',
  templateUrl: './statistics-history.component.html',
  styleUrls: ['./statistics-history.component.less'],
})
export class StatisticsHistoryComponent implements OnInit, OnDestroy {
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;

  isOnPhone = false;

  mediaStreamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  history: HistoryModel[] = [];
  historyLoading = false;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private episodeHistoryService: EpisodeHistoryService,
    private movieHistoryService: MovieHistoryService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.historyLoading = true;
    this.subscriptions.push(
      forkJoin([
        this.episodeHistoryService.getEpisodeHistory(),
        this.movieHistoryService.getMovieHistory(),
      ]).subscribe({
        next: ([episodeHistory, movieHistory]) => {
          this.history = [...episodeHistory, ...movieHistory].sort(
            (a, b) => b.viewedAt.getTime() - a.viewedAt.getTime()
          );
        },
        complete: () => {
          this.historyLoading = false;
        },
      })
    );
  }

  deleteMedia(history: HistoryModel) {
    const historyList = this.history.filter(
      historyItem => historyItem.mediaId !== history.mediaId
    );
    if (history.type === 'movies') {
      this.subscriptions.push(
        this.movieHistoryService
          .deleteMovieHistory(history.mediaId)
          .subscribe(() => (this.history = historyList))
      );
    } else {
      this.subscriptions.push(
        this.episodeHistoryService
          .deleteEpisodeHistory(history.mediaId)
          .subscribe(() => (this.history = historyList))
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
