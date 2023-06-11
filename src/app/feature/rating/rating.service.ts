import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  RatingRequest,
  RatingResponse,
  RatingResults,
} from '../../shared/models/rating.models';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private readonly http: HttpClient) {}

  getMovieRating(mediaId: number, page = 1): Observable<RatingResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<RatingResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/rating/movie/${mediaId}`,
      { params }
    );
  }

  getTvRating(mediaId: number, page = 1): Observable<RatingResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<RatingResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/rating/tv/${mediaId}`,
      { params }
    );
  }

  getUserMovieRating(
    userId: string,
    mediaId: number
  ): Observable<RatingResponse> {
    return this.http.get<RatingResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/rating/movie/${mediaId}/own`
    );
  }

  getUserTvRating(userId: string, mediaId: number): Observable<RatingResponse> {
    return this.http.get<RatingResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/rating/tv/${mediaId}/own`
    );
  }

  getUserMovieRatings(userId: string, page = 1): Observable<RatingResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<RatingResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/rating/movie/user/${userId}`,
      { params }
    );
  }

  getUserTvRatings(userId: string, page = 1): Observable<RatingResults> {
    const params = new HttpParams().set('page', page);
    return this.http.get<RatingResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/rating/tv/user/${userId}`,
      { params }
    );
  }

  saveMovieRating(mediaId: number, rating: number): Observable<RatingResponse> {
    const requestContent: RatingRequest = {
      rating,
    };
    return this.http.post<RatingResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/rating/movie/${mediaId}`,
      requestContent
    );
  }

  saveTvRating(mediaId: number, rating: number): Observable<RatingResponse> {
    const requestContent: RatingRequest = {
      rating,
    };
    return this.http.post<RatingResponse>(
      `${API_RESOURCE_URI.MEDIA_INFO}/rating/tv/${mediaId}`,
      requestContent
    );
  }
}
