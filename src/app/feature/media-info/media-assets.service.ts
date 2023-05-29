import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor, Genre, Studio } from '../../shared/models/media.models';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable({
  providedIn: 'root',
})
export class MediaAssetsService {
  constructor(private readonly http: HttpClient) {}

  getActor(tmdbID: number): Observable<Actor> {
    return this.http.get<Actor>(
      API_RESOURCE_URI.MEDIA_INFO + '/assets/actor/' + tmdbID
    );
  }

  getMovieGenre(tmdbID: number): Observable<Genre> {
    return this.http.get<Genre>(
      API_RESOURCE_URI.MEDIA_INFO + '/assets/movie-genre/' + tmdbID
    );
  }

  getMovieGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(
      API_RESOURCE_URI.MEDIA_INFO + '/assets/movie-genres'
    );
  }

  getTvShowGenre(tmdbID: number): Observable<Genre> {
    return this.http.get<Genre>(
      API_RESOURCE_URI.MEDIA_INFO + '/assets/tv-genre/' + tmdbID
    );
  }

  getTvShowGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(
      API_RESOURCE_URI.MEDIA_INFO + '/assets/tv-genres'
    );
  }

  getStudio(tmdbID: number): Observable<Studio> {
    return this.http.get<Studio>(
      API_RESOURCE_URI.MEDIA_INFO + '/assets/studio/' + tmdbID
    );
  }

  getNetwork(tmdbID: number): Observable<Studio> {
    return this.http.get<Studio>(
      API_RESOURCE_URI.MEDIA_INFO + '/assets/network/' + tmdbID
    );
  }
}
