import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Observable } from 'rxjs';
import { UserModel } from '../../../shared/models/user.models';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resources-uri';
import { CommentService } from '../../../feature/comment/comment.service';
import {
  CommentResults,
  emptyCommentResults,
} from '../../../shared/models/comment.models';

@Component({
  selector: 'app-auth-my-account',
  templateUrl: './auth-my-account.component.html',
  styleUrls: ['./auth-my-account.component.less'],
})
export class AuthMyAccountComponent implements OnInit {
  @Select(AuthState.user)
  user$!: Observable<UserModel>;
  user: UserModel | null = null;

  httpbinResponse = '{}';

  comments: CommentResults = emptyCommentResults;
  commentsCurrentPage = 1;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly commentService: CommentService
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

  onGetUserComments() {
    this.commentService
      .getUserComments(this.user?.id ?? '', this.commentsCurrentPage)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  onCommentsPageChange(page: number): void {
    this.commentsCurrentPage = page;
    this.onGetUserComments();
  }

  onRefreshComments(): void {
    this.commentsCurrentPage = 1;
    this.onGetUserComments();
  }
}
