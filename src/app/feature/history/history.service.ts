import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import { SessionIdResponse } from '../../shared/models/watch-together.models';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private readonly http: HttpClient) {}

  getSession() {
    return this.http
      .get<SessionIdResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/history/session`
      )
      .pipe(map(response => response.sessionId));
  }
}
