import { Component, OnDestroy, OnInit } from '@angular/core';
import { TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { CommentService } from '../../../feature/comment/comment.service';
import {
  CommentResults,
  emptyCommentResults,
} from '../../../shared/models/comment.models';
import {
  emptyRatingResults,
  RatingResponse,
  RatingResults,
} from '../../../shared/models/rating.models';
import { RatingService } from '../../../feature/rating/rating.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { UserResponse } from '../../../shared/models/user.models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-view',
  templateUrl: './tv-view.component.html',
  styleUrls: ['./tv-view.component.less'],
})
export class TvViewComponent implements OnInit, OnDestroy {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  tvId?: number;
  tv?: TvShowResponse;
  tvRecommendations: TvShowResponse[] = [];

  comments: CommentResults = emptyCommentResults;
  commentsCurrentPage = 1;

  userRating: RatingResponse | undefined;

  ratings: RatingResults = emptyRatingResults;
  ratingsCurrentPage = 1;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly currentRoute: ActivatedRoute,
    private readonly mediaInfoService: MediaInfoService,
    private readonly mediaDiscoverService: MediaDiscoverService,
    private readonly commentService: CommentService,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.currentRoute.params.subscribe(params => {
        this.tvId = params['id'];
        this.onGetTvShow();
        this.onGetUserRating();
      })
    );
    this.subscriptions.push(
      this.user$.subscribe(user => {
        this.user = user;
      })
    );
  }

  onGetTvShow() {
    this.subscriptions.push(
      this.mediaInfoService.getTvShowInfo(this.tvId ?? 0).subscribe(tv => {
        this.tv = tv;
      })
    );
    this.subscriptions.push(
      this.mediaDiscoverService
        .getTvShowRecommendations(this.tvId ?? 0)
        .subscribe(tvRecommendations => {
          this.tvRecommendations = tvRecommendations;
        })
    );
  }

  onGetMediaComments() {
    this.subscriptions.push(
      this.commentService
        .getTvShowComments(this.tvId ?? 0, this.commentsCurrentPage)
        .subscribe(comments => {
          this.comments = comments;
        })
    );
  }

  onCommentsPageChange(page: number): void {
    this.commentsCurrentPage = page;
    this.onGetMediaComments();
  }

  onRefreshComments(): void {
    this.commentsCurrentPage = 1;
    this.onGetMediaComments();
  }

  onGetUserRating() {
    this.subscriptions.push(
      this.ratingService
        .getUserTvRating(this.user?.id ?? '', this.tvId ?? 0)
        .subscribe(rating => {
          this.userRating = rating;
        })
    );
  }

  onGetMediaRatings() {
    this.subscriptions.push(
      this.ratingService
        .getTvRating(this.tvId ?? 0, this.ratingsCurrentPage)
        .subscribe(ratings => {
          this.ratings = ratings;
          // console.log(ratings);
        })
    );
  }

  onRatingsPageChange(page: number): void {
    this.ratingsCurrentPage = page;
    this.onGetMediaRatings();
  }

  onRefreshRatings(): void {
    this.ratingsCurrentPage = 1;
    this.onGetMediaRatings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
