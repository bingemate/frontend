import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../shared/models/user.models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resources-uri';
import { CommentService } from '../../../feature/comment/comment.service';
import {
  CommentResults,
  emptyCommentResults,
} from '../../../shared/models/comment.models';
import {
  emptyRatingResults,
  RatingResults,
} from '../../../shared/models/rating.models';
import { RatingService } from '../../../feature/rating/rating.service';
import { UserService } from '../../../feature/user/user.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthActions } from '../../../core/auth/store/auth.actions';

@Component({
  selector: 'app-auth-my-account',
  templateUrl: './auth-my-account.component.html',
  styleUrls: ['./auth-my-account.component.less'],
})
export class AuthMyAccountComponent implements OnInit {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  deleteModalVisible = false;
  deleteModalLoading = false;
  deleteModalError = false;
  deleteModalErrorMessage = '';
  deleteModalSuccess = false;

  httpbinResponse = '{}';

  movieComments: CommentResults = emptyCommentResults;
  movieCommentsCurrentPage = 1;

  movieRatings: RatingResults = emptyRatingResults;
  movieRatingsCurrentPage = 1;

  tvComments: CommentResults = emptyCommentResults;
  tvCommentsCurrentPage = 1;

  tvRatings: RatingResults = emptyRatingResults;
  tvRatingsCurrentPage = 1;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly commentService: CommentService,
    private readonly ratingService: RatingService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly keycloakService: KeycloakService,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.subscribeForAuthEvents();
  }

  subscribeForAuthEvents() {
    this.user$.subscribe(user => {
      this.user = user;
    });
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
    this.commentService
      .getUserMovieComments(this.user?.id ?? '', this.movieCommentsCurrentPage)
      .subscribe(comments => {
        this.movieComments = comments;
      });
  }

  onGetUserTvComments() {
    this.commentService
      .getUserTvComments(this.user?.id ?? '', this.tvCommentsCurrentPage)
      .subscribe(comments => {
        this.tvComments = comments;
      });
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
    this.ratingService
      .getUserMovieRatings(this.user?.id ?? '', this.movieRatingsCurrentPage)
      .subscribe(ratings => {
        this.movieRatings = ratings;
      });
  }

  onGetUserTvRatings() {
    this.ratingService
      .getUserTvRatings(this.user?.id ?? '', this.tvRatingsCurrentPage)
      .subscribe(ratings => {
        this.tvRatings = ratings;
      });
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

  showModal(): void {
    this.deleteModalVisible = true;
  }

  handleDelete(): void {
    this.deleteModalLoading = true;
    this.userService.delete().subscribe({
      next: () => {
        this.deleteModalLoading = false;
        this.deleteModalSuccess = true;
      },
      error: (error: HttpErrorResponse) => {
        this.deleteModalLoading = false;
        this.deleteModalError = true;
        this.deleteModalErrorMessage = error.error.message;
      },
    });
  }

  handleCancel(): void {
    if (this.deleteModalLoading) {
      return;
    }
    if (this.deleteModalError) {
      this.deleteModalError = false;
    }
    if (this.deleteModalSuccess) {
      this.store.dispatch(new AuthActions.Logout());
      this.keycloakService.clearToken();
      sessionStorage.clear();
      this.router.navigate(['/home']).finally(() => {
        this.keycloakService.logout(window.location.origin);
      });
    }
    this.deleteModalVisible = false;
  }
}
