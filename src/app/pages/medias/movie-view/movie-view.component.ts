import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from '../../../shared/models/media.models';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { CommentService } from '../../../feature/comment/comment.service';
import {
  CommentResults,
  emptyCommentResults,
} from '../../../shared/models/comment.models';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.less'],
})
export class MovieViewComponent {
  movieId?: number;
  movie?: MovieResponse;
  movieRecommendations: MovieResponse[] = [];

  comments: CommentResults = emptyCommentResults;
  commentsCurrentPage = 1;

  constructor(
    currentRoute: ActivatedRoute,
    private mediaInfoService: MediaInfoService,
    private mediaDiscoverService: MediaDiscoverService,
    private commentService: CommentService
  ) {
    currentRoute.params.subscribe(params => {
      this.movieId = params['id'];
      this.onGetMovie();
      this.onGetMediaComments();
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
      .getMediaComments(this.movieId ?? 0, this.commentsCurrentPage)
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
