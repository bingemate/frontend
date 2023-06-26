import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobLog, UploadResponse } from '../../shared/models/upload-scan.models';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable()
export class UploadScanService {
  constructor(private http: HttpClient) {}

  scanMovies(): Observable<string> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/scan/movie`;
    return this.http.post<string>(url, {});
  }

  scanTVShows(): Observable<string> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/scan/tv`;
    return this.http.post<string>(url, {});
  }

  scanAll(): Observable<string> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/scan/all`;
    return this.http.post<string>(url, {});
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

  popJobLogs(): Observable<JobLog[]> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/job/pop-logs`;
    return this.http.get<JobLog[]>(url);
  }

  getJobLogs(): Observable<JobLog[]> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/job/logs`;
    return this.http.get<JobLog[]>(url);
  }

  getJobName(): Observable<string> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/job/job-name`;
    return this.http.get<string>(url);
  }

  isJobRunning(): Observable<boolean> {
    const url = `${API_RESOURCE_URI.MEDIA_INDEXER}/job/is-running`;
    return this.http.get<boolean>(url);
  }
}
