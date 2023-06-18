import { Component, OnInit } from '@angular/core';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Select } from '@ngxs/store';
import {
  CommentStat,
  Statistic,
} from '../../../shared/models/statistic.models';
import { CommentService } from '../../../feature/comment/comment.service';
import { RatingService } from '../../../feature/rating/rating.service';
import { filter, forkJoin, mergeMap, Observable } from 'rxjs';
import { UserResponse } from '../../../shared/models/user.models';
import { millisToHours } from '../../../shared/utils/date.utils';
import { EpisodeStatisticsService } from '../../../feature/statistics/episode-statistics.service';
import { MovieStatisticsService } from '../../../feature/statistics/movie-statistics.service';

@Component({
  selector: 'app-statistics-watch-stats',
  templateUrl: './statistics-watch-stats.component.html',
  styleUrls: ['./statistics-watch-stats.component.less'],
})
export class StatisticsWatchStatsComponent implements OnInit {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  episodeStats: Statistic[] = [];
  movieStats: Statistic[] = [];
  commentStats: CommentStat[] = [];
  watchTime = 0;
  commentsCount = 0;
  ratingsCount = 0;
  watchedMediaCount = 0;

  constructor(
    private episodeStatisticsService: EpisodeStatisticsService,
    private movieStatisticsService: MovieStatisticsService,
    private commentService: CommentService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    const sixMonthAgo = new Date();
    sixMonthAgo.setDate(1);
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    this.user$
      .pipe(
        filter(user => user !== null && user !== undefined),
        mergeMap(user =>
          forkJoin([
            this.episodeStatisticsService.getStatisticsByUserId(user.id),
            this.movieStatisticsService.getStatisticsByUserId(user.id),
            this.commentService.getCommentCount(),
            this.ratingService.getRatingCount(),
            this.commentService.getCommentHistory(
              new Date().toDateString(),
              sixMonthAgo.toDateString()
            ),
          ])
        )
      )
      .subscribe(
        ([episodeStats, movieStats, commentsCount, ratingsCount, comments]) => {
          this.episodeStats = episodeStats;
          this.movieStats = movieStats;
          this.commentsCount = commentsCount;
          this.ratingsCount = ratingsCount;
          this.commentStats = comments;
          this.watchTime = episodeStats
            .map(stat =>
              millisToHours(stat.stoppedAt.getTime() - stat.startedAt.getTime())
            )
            .reduce((a, b) => a + b);
          this.watchTime += movieStats
            .map(stat =>
              millisToHours(stat.stoppedAt.getTime() - stat.startedAt.getTime())
            )
            .reduce((a, b) => a + b);
          this.watchedMediaCount =
            new Set(episodeStats.map(stat => stat.mediaId)).size +
            new Set(movieStats.map(stat => stat.mediaId)).size;
        }
      );
  }
}
