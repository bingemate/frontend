import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  UsernameResponse,
  UserResponse,
} from '../../shared/models/user.models';

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

  searchUsers(query: string, includeRoles = false): Observable<UserResponse[]> {
    const params = new HttpParams()
      .set('query', query)
      .set('includeRoles', includeRoles.toString());
    return this.http.get<UserResponse[]>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-info/search`,
      { params }
    );
  }
}
