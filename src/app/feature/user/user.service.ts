import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  RatingRequest,
  RatingResponse,
  RatingResults,
} from '../../shared/models/rating.models';
import { UsernameResponse } from '../../shared/models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUsername(userId: string): Observable<UsernameResponse> {
    return this.http.get<UsernameResponse>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-info/${userId}/username`
    );
  }
}
