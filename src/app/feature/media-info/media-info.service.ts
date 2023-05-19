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

  getMediaInfo(id: string): Observable<MediaResponse> {
    return this.http.get<MediaResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/base/' + id
    );
  }

  getMediaInfoByTmdbId(tmdbId: number): Observable<MediaResponse> {
    return this.http.get<MediaResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/base-tmdb/' + tmdbId
    );
  }

  getMovieInfo(id: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/movie/' + id
    );
  }

  getMovieInfoByTmdbId(tmdbId: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/movie-tmdb/' + tmdbId
    );
  }

  getTvShowInfo(id: string): Observable<TvShowResponse> {
    return this.http.get<TvShowResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/tvshow/' + id
    );
  }

  getTvShowInfoByTmdbId(tmdbId: number): Observable<TvShowResponse> {
    return this.http.get<TvShowResponse>(
      API_RESOURCE_URI.MEDIA_INFO + '/media/tvshow-tmdb/' + tmdbId
    );
  }

  getTvShowEpisodeInfo(
    id: string,
    seasonNumber: number,
    episodeNumber: number
  ): Observable<TvEpisodeResponse> {
    return this.http.get<TvEpisodeResponse>(
      API_RESOURCE_URI.MEDIA_INFO +
        '/media/tvshow-episode/' +
        id +
        '/' +
        seasonNumber +
        '/' +
        episodeNumber
    );
  }

  getTvShowEpisodeInfoByTmdbId(
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
    id: string,
    seasonNumber: number
  ): Observable<TvEpisodeResponse[]> {
    return this.http.get<TvEpisodeResponse[]>(
      API_RESOURCE_URI.MEDIA_INFO +
        '/media/tvshow-season-episodes/' +
        id +
        '/' +
        seasonNumber
    );
  }

  getTvShowSeasonEpisodesInfoByTmdbId(
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
