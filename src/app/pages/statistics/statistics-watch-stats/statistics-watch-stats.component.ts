import { Component, OnInit } from '@angular/core';
import { EpisodeStatisticsService } from '../episode-statistics.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Select } from '@ngxs/store';
import { MovieStatisticsService } from '../movie-statistics.service';
import { Statistic } from '../../../shared/models/statistic.models';
import { CommentService } from '../../../feature/comment/comment.service';
import { CommentResponse } from '../../../shared/models/comment.models';
import { RatingService } from '../../../feature/rating/rating.service';
import { RatingResponse } from '../../../shared/models/rating.models';
import { filter, forkJoin, mergeMap, Observable } from 'rxjs';
import { UserResponse } from '../../../shared/models/user.models';

@Component({
  selector: 'app-statistics-watch-stats',
  templateUrl: './statistics-watch-stats.component.html',
  styleUrls: ['./statistics-watch-stats.component.less'],
})
export class StatisticsWatchStatsComponent implements OnInit {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  stats: Statistic[] = [];
  comments: CommentResponse[] = [];
  ratings: RatingResponse[] = [];
  watchTime = 200;

  constructor(
    private episodeStatisticsService: EpisodeStatisticsService,
    private movieStatisticsService: MovieStatisticsService,
    private commentService: CommentService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.user$
      .pipe(
        filter(user => user !== null && user !== undefined),
        mergeMap(user =>
          forkJoin([
            this.episodeStatisticsService.getStatisticsByUserId(user.id),
            this.movieStatisticsService.getStatisticsByUserId(user.id),
            this.commentService.getUserComments(user.id),
            this.ratingService.getUserRating(user.id),
          ])
        )
      )
      .subscribe(([episodeStats, movieStats, comments, ratings]) => {
        this.stats = [...episodeStats, ...movieStats];
        this.comments = comments.results;
        this.ratings = ratings.results;
      });
  }
}
