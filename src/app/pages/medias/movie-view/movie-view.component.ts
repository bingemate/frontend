import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from '../../../shared/models/media.models';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { CommentService } from '../../../feature/comment/comment.service';
import {
  CommentResults,
  emptyCommentResults,
} from '../../../shared/models/comment.models';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Observable } from 'rxjs';
import {
  emptyRatingResults,
  RatingResponse,
  RatingResults,
} from '../../../shared/models/rating.models';
import { RatingService } from '../../../feature/rating/rating.service';
import { UserResponse } from '../../../shared/models/user.models';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.less'],
})
export class MovieViewComponent {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  movieId?: number;
  movie?: MovieResponse;
  movieRecommendations: MovieResponse[] = [];

  comments: CommentResults = emptyCommentResults;
  commentsCurrentPage = 1;

  userRating: RatingResponse | undefined;

  ratings: RatingResults = emptyRatingResults;
  ratingsCurrentPage = 1;

  constructor(
    currentRoute: ActivatedRoute,
    private readonly mediaInfoService: MediaInfoService,
    private readonly mediaDiscoverService: MediaDiscoverService,
    private readonly commentService: CommentService,
    private readonly ratingService: RatingService
  ) {
    currentRoute.params.subscribe(params => {
      this.movieId = params['id'];
      this.onGetMovie();
      this.onGetUserRating();
    });
    this.user$.subscribe(user => {
      this.user = user;
    });
  }
  onGetMovie() {
    this.mediaInfoService.getMovieInfo(this.movieId ?? 0).subscribe(movie => {
      this.movie = movie;
    });
    this.mediaDiscoverService
      .getMovieRecommendations(this.movieId ?? 0)
      .subscribe(movieRecommendations => {
        this.movieRecommendations = movieRecommendations;
      });
  }

  onGetMediaComments() {
    this.commentService
      .getMovieComments(this.movieId ?? 0, this.commentsCurrentPage)
      .subscribe(comments => {
        this.comments = comments;
      });
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
    this.ratingService
      .getUserMovieRating(this.user?.id ?? '', this.movieId ?? 0)
      .subscribe(rating => {
        this.userRating = rating;
      });
  }

  onGetMediaRatings() {
    this.ratingService
      .getMovieRating(this.movieId ?? 0, this.ratingsCurrentPage)
      .subscribe(ratings => {
        this.ratings = ratings;
        console.log(ratings);
      });
  }

  onRatingsPageChange(page: number): void {
    this.ratingsCurrentPage = page;
    this.onGetMediaRatings();
  }

  onRefreshRatings(): void {
    this.ratingsCurrentPage = 1;
    this.onGetMediaRatings();
  }
}
