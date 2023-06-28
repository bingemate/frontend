import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  CommentStat,
  Statistic,
} from '../../../../shared/models/statistic.models';
import { EpisodeStatisticsService } from '../../episode-statistics.service';
import { MovieStatisticsService } from '../../movie-statistics.service';
import { CommentService } from '../../../comment/comment.service';
import { RatingService } from '../../../rating/rating.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { millisToHours } from '../../../../shared/utils/date.utils';
import { UserService } from '../../../user/user.service';
import { MediaFileService } from '../../../media-file/media-file.service';

@Component({
  selector: 'app-statistic-view',
  templateUrl: './statistic-view.component.html',
  styleUrls: ['./statistic-view.component.less'],
})
export class StatisticViewComponent implements OnInit, OnDestroy {
  @Input()
  userID = '';

  episodeStats: Statistic[] = [];
  movieStats: Statistic[] = [];
  commentStats: CommentStat[] = [];
  watchTime = 0;
  commentsCount = 0;
  ratingsCount = 0;
  watchedMediaCount = 0;

  userCount = 0;
  subscriberCount = 0;
  availableMovieCount = 0;
  availableTvCount = 0;
  availableEpisodeCount = 0;
  availableMovieDuration = 0;
  availableTvDuration = 0;
  mediafileSize = 0;

  private subscriptions: Subscription[] = [];
  constructor(
    private episodeStatisticsService: EpisodeStatisticsService,
    private movieStatisticsService: MovieStatisticsService,
    private readonly mediaFileService: MediaFileService,
    private commentService: CommentService,
    private ratingService: RatingService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userID !== '') {
      this.loadUserStatistics();
    } else {
      this.loadAllStatistics();
    }
  }

  private loadUserStatistics(): void {
    this.subscriptions.push(
      this.getUserData(this.userID, this.getSixMonthsAgo()).subscribe(
        ([episodeStats, movieStats, commentsCount, ratingsCount, comments]) => {
          this.episodeStats = episodeStats;
          this.movieStats = movieStats;
          this.commentsCount = commentsCount;
          this.ratingsCount = ratingsCount;
          this.commentStats = comments;
          this.watchTime =
            this.calculateWatchTime(episodeStats) +
            this.calculateWatchTime(movieStats);
          this.watchedMediaCount =
            this.calculateWatchedMediaCount(episodeStats) +
            this.calculateWatchedMediaCount(movieStats);
        }
      )
    );
  }

  private loadAllStatistics(): void {
    this.subscriptions.push(
      this.getAllData(this.getSixMonthsAgo()).subscribe(
        ([
          episodeStats,
          movieStats,
          commentsCount,
          ratingsCount,
          comments,
          userCount,
          subscriberCount,
          availableMovieCount,
          availableTvCount,
          availableEpisodeCount,
          availableMovieDuration,
          availableTvDuration,
          metafileSize,
        ]) => {
          this.episodeStats = episodeStats;
          this.movieStats = movieStats;
          this.commentsCount = commentsCount;
          this.ratingsCount = ratingsCount;
          this.commentStats = comments;
          this.watchTime =
            this.calculateWatchTime(episodeStats) +
            this.calculateWatchTime(movieStats);
          this.watchedMediaCount =
            this.calculateWatchedMediaCount(episodeStats) +
            this.calculateWatchedMediaCount(movieStats);
          this.userCount = userCount;
          this.subscriberCount = subscriberCount;
          this.availableMovieCount = availableMovieCount;
          this.availableTvCount = availableTvCount;
          this.availableEpisodeCount = availableEpisodeCount;
          this.availableMovieDuration = availableMovieDuration;
          this.availableTvDuration = availableTvDuration;
          this.mediafileSize = metafileSize;
        }
      )
    );
  }

  private getSixMonthsAgo(): Date {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return sixMonthsAgo;
  }

  private getUserData(
    userId: string,
    sixMonthsAgo: Date
  ): Observable<[Statistic[], Statistic[], number, number, CommentStat[]]> {
    return forkJoin([
      this.episodeStatisticsService.getStatisticsByUserId(userId),
      this.movieStatisticsService.getStatisticsByUserId(userId),
      this.commentService.getUserCommentCount(userId),
      this.ratingService.getUserRatingCount(userId),
      this.commentService.getUserCommentStat(
        userId,
        new Date().toDateString(),
        sixMonthsAgo.toDateString()
      ),
    ]);
  }

  getAllData(
    sixMonthAgo: Date
  ): Observable<
    [
      Statistic[],
      Statistic[],
      number,
      number,
      CommentStat[],
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ]
  > {
    return forkJoin([
      this.episodeStatisticsService.getStatistics(),
      this.movieStatisticsService.getStatistics(),
      this.commentService.getCommentCount(),
      this.ratingService.getRatingCount(),
      this.commentService.getCommentStat(
        new Date().toDateString(),
        sixMonthAgo.toDateString()
      ),
      this.userService.adminCountUsers(),
      this.userService.adminCountUsersByRole('bingemate-subscribed'),
      this.mediaFileService.countAvailableMovies(),
      this.mediaFileService.countAvailableTvShows(),
      this.mediaFileService.countAvailableEpisodes(),
      this.mediaFileService.countAvailableMovieDuration(),
      this.mediaFileService.countAvailableEpisodeDuration(),
      this.mediaFileService.getMediaFileTotalSize(),
    ]);
  }

  private calculateWatchTime(stats: Statistic[]): number {
    return stats
      .map(stat =>
        millisToHours(stat.stoppedAt.getTime() - stat.startedAt.getTime())
      )
      .reduce((a, b) => a + b, 0);
  }

  private calculateWatchedMediaCount(stats: Statistic[]): number {
    return new Set(stats.map(stat => stat.mediaId)).size;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
