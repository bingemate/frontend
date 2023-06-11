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

  getCommentCount(): Observable<number> {
    return this.http.get<number>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/count`
    );
  }

  getCommentHistory(start?: string, end?: string): Observable<CommentResults> {
    const params = new HttpParams();
    if (start) {
      params.set('start', start);
    }
    if (end) {
      params.set('end', end);
    }
    return this.http.get<CommentResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/history`,
      { params }
    );
  }

  getUserCommentCount(userId: string): Observable<number> {
    return this.http.get<number>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/user/count/${userId}`
    );
  }

  getUserCommentHistory(
    userId: string,
    start?: string,
    end?: string
  ): Observable<CommentResults> {
    const params = new HttpParams();
    if (start) {
      params.set('start', start);
    }
    if (end) {
      params.set('end', end);
    }
    return this.http.get<CommentResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/user/history/${userId}`,
      { params }
    );
  }

  getUserMovieComments(userId: string, page = 1): Observable<CommentResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<CommentResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/movie/user/${userId}`,
      { params }
    );
  }

  getUserTvComments(userId: string, page = 1): Observable<CommentResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<CommentResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/tv/user/${userId}`,
      { params }
    );
  }

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
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/tv/${mediaId}`,
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

  updateMovieComment(
    commentId: number,
    content: string
  ): Observable<CommentResponse> {
    const requestContent: CommentRequest = {
      content,
    };
    return this.http.put<CommentResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/movie/${commentId}`,
      requestContent
    );
  }

  updateTvShowComment(
    commentId: number,
    content: string
  ): Observable<CommentResponse> {
    const requestContent: CommentRequest = {
      content,
    };
    return this.http.put<CommentResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/tv/${commentId}`,
      requestContent
    );
  }

  deleteMovieComment(commentId: number): Observable<string> {
    return this.http.delete<string>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/movie/${commentId}`
    );
  }

  deleteTvShowComment(commentId: number): Observable<string> {
    return this.http.delete<string>(
      `${API_RESOURCE_URI.MEDIA_INFO}/comment/tv/${commentId}`
    );
  }
}
