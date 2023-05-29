import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MovieScanResponse,
  TVScanResponse,
  UploadResponse,
} from '../../shared/models/uplad-scan.models';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable()
export class UploadScanService {
  constructor(private http: HttpClient) {}

  scanMovies(): Observable<MovieScanResponse> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/scan/movie`;
    return this.http.post<MovieScanResponse>(url, {});
  }

  scanTVShows(): Observable<TVScanResponse> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/scan/tv`;
    return this.http.post<TVScanResponse>(url, {});
  }

  uploadMovie(file: File): Observable<UploadResponse> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/upload/movie`;
    const formData = new FormData();
    formData.append('upload[]', file);
    return this.http.post<UploadResponse>(url, formData);
  }

  uploadTVShow(file: File): Observable<UploadResponse> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/upload/tv`;
    const formData = new FormData();
    formData.append('upload[]', file);
    return this.http.post<UploadResponse>(url, formData);
  }
}
