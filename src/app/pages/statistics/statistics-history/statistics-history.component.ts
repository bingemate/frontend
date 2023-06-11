import { Component, OnInit } from '@angular/core';
import { navigationRoot } from '../../../app-routing.module';
import { streamingLinks } from '../../streaming/streaming-routing.module';
import { Select } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { AuthState } from '../../../core/auth/store/auth.state';
import { EpisodeHistoryService } from '../../../feature/history/episode-history.service';
import { MovieHistoryService } from '../../../feature/history/movie-history.service';
import { HistoryModel } from '../../../shared/models/history.models';

@Component({
  selector: 'app-statistics-history',
  templateUrl: './statistics-history.component.html',
  styleUrls: ['./statistics-history.component.less'],
})
export class StatisticsHistoryComponent implements OnInit {
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;

  mediaStreamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  history: HistoryModel[] = [];

  constructor(
    private episodeHistoryService: EpisodeHistoryService,
    private movieHistoryService: MovieHistoryService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.episodeHistoryService.getEpisodeHistory(),
      this.movieHistoryService.getMovieHistory(),
    ]).subscribe(
      ([episodeHistory, movieHistory]) =>
        (this.history = [...episodeHistory, ...movieHistory].sort(
          (a, b) => b.viewedAt.getTime() - a.viewedAt.getTime()
        ))
    );
  }

  deleteMedia(history: HistoryModel) {
    const historyList = this.history.filter(
      historyItem => historyItem.mediaId !== history.mediaId
    );
    if (history.type === 'movies') {
      this.movieHistoryService
        .deleteMovieHistory(history.mediaId)
        .subscribe(() => (this.history = historyList));
    } else {
      this.episodeHistoryService
        .deleteEpisodeHistory(history.mediaId)
        .subscribe(() => (this.history = historyList));
    }
  }
}
