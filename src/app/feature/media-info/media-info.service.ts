import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MovieResponse,
  TvEpisodeResponse,
  TvShowResponse,
} from '../../shared/models/media.models';
import { Observable, of } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import { MediaFile } from '../../shared/models/media-file.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MediaInfoService {
  private readonly tvNames = new Map<number, TvShowResponse>();
  private readonly movieNames = new Map<number, MovieResponse>();
  constructor(private readonly http: HttpClient) {}

  getMovieInfo(tmdbId: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/movie-tmdb/' + tmdbId
    );
  }

  getMovieShortInfo(tmdbId: number): Observable<MovieResponse> {
    const movieTitle = this.movieNames.get(tmdbId);
    if (movieTitle) {
      return of(movieTitle);
    }
    return this.http
      .get<MovieResponse>(
        API_RESOURCE_URI.MEDIA_INFO + '/media/movie-tmdb/' + tmdbId + '/short'
      )
      .pipe(tap(title => this.movieNames.set(tmdbId, title)));
  }

  getTvShowInfo(tmdbId: number): Observable<TvShowResponse> {
    return this.http.get<TvShowResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/tvshow-tmdb/' + tmdbId
    );
  }

  getTvShowShortInfo(tmdbId: number): Observable<TvShowResponse> {
    const tvTitle = this.tvNames.get(tmdbId);
    if (tvTitle) {
      return of(tvTitle);
    }
    return this.http
      .get<TvShowResponse>(
        API_RESOURCE_URI.MEDIA_INFO + '/media/tvshow-tmdb/' + tmdbId + '/short'
      )
      .pipe(tap(title => this.tvNames.set(tmdbId, title)));
  }

  getTvShowEpisodeInfo(
    tmdbId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Observable<TvEpisodeResponse> {
    return this.http.get<TvEpisodeResponse>(
      API_RESOURCE_URI.MEDIA_INFO +
        '/media/tvshow-episode-tmdb/' +
        tmdbId +
        '/' +
        seasonNumber +
        '/' +
        episodeNumber
    );
  }

  getTvShowEpisodeInfoById(tmdbId: number): Observable<TvEpisodeResponse> {
    return this.http.get<TvEpisodeResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/episode-tmdb/' + tmdbId
    );
  }

  getTvShowSeasonEpisodesInfo(
    tmdbId: number,
    seasonNumber: number
  ): Observable<TvEpisodeResponse[]> {
    return this.http.get<TvEpisodeResponse[]>(
      API_RESOURCE_URI.MEDIA_INFO +
        '/media/tvshow-season-episodes-tmdb/' +
        tmdbId +
        '/' +
        seasonNumber
    );
  }

  getMovieFileInfos(mediaId: number): Observable<MediaFile> {
    return this.http.get<MediaFile>(
      API_RESOURCE_URI.MEDIA_INFO + '/media-file/movie/' + mediaId
    );
  }

  getEpisodeFileInfos(mediaId: number): Observable<MediaFile> {
    return this.http.get<MediaFile>(
      API_RESOURCE_URI.MEDIA_INFO + '/media-file/episode/' + mediaId
    );
  }

  getAvailableEpisodes(mediaId: number): Observable<number[]> {
    return this.http.get<number[]>(
      `${API_RESOURCE_URI.MEDIA_INFO}/media-file/tv/${mediaId}/available`
    );
  }
}
