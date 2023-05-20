import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MediaResponse,
  MovieResponse,
  TvEpisodeResponse,
  TvShowResponse,
} from '../../shared/models/media.models';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable({
  providedIn: 'root',
})
export class MediaInfoService {
  constructor(private readonly http: HttpClient) {}

  getMediaInfo(tmdbId: number): Observable<MediaResponse> {
    return this.http.get<MediaResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/base-tmdb/' + tmdbId
    );
  }

  getMovieInfo(tmdbId: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/movie-tmdb/' + tmdbId
    );
  }

  getTvShowInfo(tmdbId: number): Observable<TvShowResponse> {
    return this.http.get<TvShowResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/tvshow-tmdb/' + tmdbId
    );
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
}
