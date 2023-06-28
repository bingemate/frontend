import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  EpisodeFileResults,
  MovieFileResults,
} from '../../shared/models/media-file.models';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable({
  providedIn: 'root',
})
export class MediaFileService {
  constructor(private readonly http: HttpClient) {}

  searchEpisodeFiles(
    query: string,
    page = 1,
    limit = 10
  ): Observable<EpisodeFileResults> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page)
      .set('limit', limit);

    return this.http.get<EpisodeFileResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/episode/search`,
      { params }
    );
  }

  searchMovieFiles(
    query: string,
    page = 1,
    limit = 10
  ): Observable<MovieFileResults> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page)
      .set('limit', limit);

    return this.http.get<MovieFileResults>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/movie/search`,
      { params }
    );
  }

  deleteMediaFile(id: string): Observable<string> {
    return this.http.delete<string>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/${id}`
    );
  }

  getMediaFileTotalSize(): Observable<number> {
    return this.http.get<number>(`${API_RESOURCE_URI.MEDIA_INFO}/file/size`);
  }

  countMediaFiles(): Observable<number> {
    return this.http.get<number>(`${API_RESOURCE_URI.MEDIA_INFO}/file/count`);
  }

  availableSpace(): Observable<number> {
    return this.http.get<number>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/available`
    );
  }

  countAvailableMovies(): Observable<number> {
    return this.http.get<number>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/movie/count`
    );
  }

  countAvailableEpisodes(): Observable<number> {
    return this.http.get<number>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/episode/count`
    );
  }

  countAvailableTvShows(): Observable<number> {
    return this.http.get<number>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/tv/count`
    );
  }

  countAvailableMovieDuration(): Observable<number> {
    return this.http.get<number>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/movie/duration`
    );
  }

  countAvailableEpisodeDuration(): Observable<number> {
    return this.http.get<number>(
      `${API_RESOURCE_URI.MEDIA_INFO}/file/episode/duration`
    );
  }
}
