import { Component } from '@angular/core';
import { TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { CommentService } from '../../../feature/comment/comment.service';
import {
  CommentResults,
  emptyCommentResults,
} from '../../../shared/models/comment.models';

@Component({
  selector: 'app-tv-view',
  templateUrl: './tv-view.component.html',
  styleUrls: ['./tv-view.component.less'],
})
export class TvViewComponent {
  tvId?: number;
  tv?: TvShowResponse;
  tvRecommendations: TvShowResponse[] = [];

  comments: CommentResults = emptyCommentResults;
  commentsCurrentPage = 1;

  constructor(
    readonly currentRoute: ActivatedRoute,
    private readonly mediaInfoService: MediaInfoService,
    private readonly mediaDiscoverService: MediaDiscoverService,
    private readonly commentService: CommentService
  ) {
    currentRoute.params.subscribe(params => {
      this.tvId = params['id'];
      this.onGetTvShow();
      this.onGetMediaComments();
    });
  }

  onGetTvShow() {
    this.mediaInfoService.getTvShowInfo(this.tvId ?? 0).subscribe(tv => {
      this.tv = tv;
    });
    this.mediaDiscoverService
      .getTvShowRecommendations(this.tvId ?? 0)
      .subscribe(tvRecommendations => {
        this.tvRecommendations = tvRecommendations;
      });
  }

  onGetMediaComments() {
    this.commentService
      .getMediaComments(this.tvId ?? 0, this.commentsCurrentPage)
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
}
