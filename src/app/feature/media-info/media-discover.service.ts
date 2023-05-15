import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MovieResponse,
  MovieResults,
  TvShowResponse,
  TvShowResults,
} from '../../shared/models/media.models';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable({
  providedIn: 'root',
})
export class MediaDiscoverService {
  constructor(private readonly http: HttpClient) {}

  getMoviesByActor(actorId: number, page = 1): Observable<MovieResults> {
    const params = new HttpParams()
      .set('actor', actorId)
      .set('page', page.toString());

    return this.http.get<MovieResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/movie/actor',
      { params }
    );
  }

  getMovieByDirector(directorId: number, page = 1): Observable<MovieResults> {
    const params = new HttpParams()
      .set('director', directorId)
      .set('page', page.toString());

    return this.http.get<MovieResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/movie/director',
      { params }
    );
  }

  getMovieByGenre(genreId: number, page = 1): Observable<MovieResults> {
    const params = new HttpParams()
      .set('genre', genreId)
      .set('page', page.toString());

    return this.http.get<MovieResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/movie/genre',
      { params }
    );
  }

  getMovieByStudio(studioId: number, page = 1): Observable<MovieResults> {
    const params = new HttpParams()
      .set('studio', studioId)
      .set('page', page.toString());

    return this.http.get<MovieResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/movie/studio',
      { params }
    );
  }

  getPopularMovies(page = 1): Observable<MovieResults> {
    const params = new HttpParams().set('page', page.toString());

    return this.http.get<MovieResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/movie/popular',
      { params }
    );
  }

  getRecentMovies(): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/movie/recent'
    );
  }

  getMovieRecommendations(movieId: number): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/movie/recommendations/' + movieId
    );
  }

  searchMovies(query: string, page = 1): Observable<MovieResults> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString());

    return this.http.get<MovieResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/movie/search',
      { params }
    );
  }

  getTvShowsByGenre(genreId: number, page = 1): Observable<TvShowResults> {
    const params = new HttpParams()
      .set('genre', genreId)
      .set('page', page.toString());

    return this.http.get<TvShowResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/tv/genre',
      { params }
    );
  }

  getTvShowsByNetwork(networkId: number, page = 1): Observable<TvShowResults> {
    const params = new HttpParams()
      .set('network', networkId)
      .set('page', page.toString());

    return this.http.get<TvShowResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/tv/network',
      { params }
    );
  }

  getPopularTvShows(page = 1): Observable<TvShowResults> {
    const params = new HttpParams().set('page', page.toString());

    return this.http.get<TvShowResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/tv/popular',
      { params }
    );
  }

  getRecentTvShows(): Observable<TvShowResponse[]> {
    return this.http.get<TvShowResponse[]>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/tv/recent'
    );
  }

  getTvShowRecommendations(tvShowId: number): Observable<TvShowResponse[]> {
    return this.http.get<TvShowResponse[]>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/tv/recommendations/' + tvShowId
    );
  }

  searchTvShows(query: string, page = 1): Observable<TvShowResults> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString());

    return this.http.get<TvShowResults>(
      API_RESOURCE_URI.MEDIA_INFO + '/discover/tv/search',
      { params }
    );
  }
}