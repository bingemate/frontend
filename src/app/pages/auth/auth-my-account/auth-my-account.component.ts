import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Observable, Subscription } from 'rxjs';
import { UserResponse } from '../../../shared/models/user.models';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resources-uri';
import { CommentService } from '../../../feature/comment/comment.service';
import { CommentResults, emptyCommentResults } from '../../../shared/models/comment.models';
import { emptyRatingResults, RatingResults } from '../../../shared/models/rating.models';
import { RatingService } from '../../../feature/rating/rating.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-auth-my-account',
  templateUrl: './auth-my-account.component.html',
  styleUrls: ['./auth-my-account.component.less'],
})
export class AuthMyAccountComponent implements OnInit, OnDestroy {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  isOnPhone = false;

  httpbinResponse = '{}';

  movieComments: CommentResults = emptyCommentResults;
  movieCommentsCurrentPage = 1;

  movieRatings: RatingResults = emptyRatingResults;
  movieRatingsCurrentPage = 1;

  tvComments: CommentResults = emptyCommentResults;
  tvCommentsCurrentPage = 1;

  tvRatings: RatingResults = emptyRatingResults;
  tvRatingsCurrentPage = 1;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly httpClient: HttpClient,
    private readonly commentService: CommentService,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.subscribeForAuthEvents();
  }

  subscribeForAuthEvents() {
    this.subscriptions.push(
      this.user$.subscribe(user => {
        this.user = user;
      })
    );
  }

  getHttpBin() {
    this.httpClient
      .get(API_RESOURCE_URI.HTTP_BIN, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response: unknown) => {
        this.httpbinResponse = JSON.stringify(response, null, 2);
      });
  }

  onGetUserMovieComments() {
    this.subscriptions.push(
      this.commentService
        .getUserMovieComments(
          this.user?.id ?? '',
          this.movieCommentsCurrentPage
        )
        .subscribe(comments => {
          this.movieComments = comments;
        })
    );
  }

  onGetUserTvComments() {
    this.subscriptions.push(
      this.commentService
        .getUserTvComments(this.user?.id ?? '', this.tvCommentsCurrentPage)
        .subscribe(comments => {
          this.tvComments = comments;
        })
    );
  }

  onMovieCommentsPageChange(page: number): void {
    this.movieCommentsCurrentPage = page;
    this.onGetUserMovieComments();
  }

  onTvCommentsPageChange(page: number): void {
    this.tvCommentsCurrentPage = page;
    this.onGetUserTvComments();
  }

  onRefreshAllComments(): void {
    this.movieCommentsCurrentPage = 1;
    this.tvCommentsCurrentPage = 1;
    this.onGetUserMovieComments();
    this.onGetUserTvComments();
  }

  onRefreshMovieComments(): void {
    this.movieCommentsCurrentPage = 1;
    this.onGetUserMovieComments();
  }

  onRefreshTvComments(): void {
    this.tvCommentsCurrentPage = 1;
    this.onGetUserTvComments();
  }

  onGetUserMovieRatings() {
    this.subscriptions.push(
      this.ratingService
        .getUserMovieRatings(this.user?.id ?? '', this.movieRatingsCurrentPage)
        .subscribe(ratings => {
          this.movieRatings = ratings;
        })
    );
  }

  onGetUserTvRatings() {
    this.subscriptions.push(
      this.ratingService
        .getUserTvRatings(this.user?.id ?? '', this.tvRatingsCurrentPage)
        .subscribe(ratings => {
          this.tvRatings = ratings;
        })
    );
  }

  onMovieRatingsPageChange(page: number): void {
    this.movieRatingsCurrentPage = page;
    this.onGetUserMovieRatings();
  }

  onTvRatingsPageChange(page: number): void {
    this.tvRatingsCurrentPage = page;
    this.onGetUserTvRatings();
  }

  onRefreshAllRatings(): void {
    this.movieRatingsCurrentPage = 1;
    this.tvRatingsCurrentPage = 1;
    this.onGetUserMovieRatings();
    this.onGetUserTvRatings();
  }

  onRefreshMovieRatings(): void {
    this.movieRatingsCurrentPage = 1;
    this.onGetUserMovieRatings();
  }

  onRefreshTvRatings(): void {
    this.tvRatingsCurrentPage = 1;
    this.onGetUserTvRatings();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
