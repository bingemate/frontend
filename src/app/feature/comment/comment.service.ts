import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  CommentRequest,
  CommentResponse,
  CommentResults,
} from '../../shared/models/comment.models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private readonly http: HttpClient) {}

  getMovieComments(mediaId: number, page = 1): Observable<CommentResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<CommentResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/movie/${mediaId}`,
      { params }
    );
  }

  getTvShowComments(mediaId: number, page = 1): Observable<CommentResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<CommentResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/movie/${mediaId}`,
      { params }
    );
  }

  getUserComments(userId: string, page = 1): Observable<CommentResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<CommentResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/user/${userId}`,
      { params }
    );
  }

  createMovieComment(
    mediaId: number,
    content: string
  ): Observable<CommentResponse> {
    const requestContent: CommentRequest = {
      content,
    };
    return this.http.post<CommentResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/movie/${mediaId}`,
      requestContent
    );
  }

  createTvShowComment(
    mediaId: number,
    content: string
  ): Observable<CommentResponse> {
    const requestContent: CommentRequest = {
      content,
    };
    return this.http.post<CommentResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/tv/${mediaId}`,
      requestContent
    );
  }

  updateComment(
    commentId: number,
    content: string
  ): Observable<CommentResponse> {
    const requestContent: CommentRequest = {
      content,
    };
    return this.http.put<CommentResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/${commentId}`,
      requestContent
    );
  }

  deleteComment(commentId: number): Observable<string> {
    return this.http.delete<string>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/${commentId}`
    );
  }
}
