import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  RoleRequest,
  UpdateUserPasswordRequest,
  UpdateUserRequest,
  UsernameResponse,
  UserResponse,
  UserResults,
} from '../../shared/models/user.models';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usernames = new Map<string, UsernameResponse>();
  constructor(private readonly http: HttpClient) {}

  getUsername(userId: string): Observable<UsernameResponse> {
    const username = this.usernames.get(userId);
    if (username) {
      return of(username);
    }
    return this.http
      .get<UsernameResponse>(
        `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-info/username/${userId}`
      )
      .pipe(tap(username => this.usernames.set(userId, username)));
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

  getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-info/${userId}`
    );
  }

  getMe(): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-info/me`
    );
  }

  update(updateUser: UpdateUserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-edit`,
      updateUser
    );
  }

  updatePassword(
    updatePassword: UpdateUserPasswordRequest
  ): Observable<string> {
    return this.http.put<string>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-edit/password`,
      updatePassword
    );
  }

  delete(): Observable<string> {
    return this.http.delete<string>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-edit`
    );
  }

  updateUser(
    userId: string,
    updateUser: UpdateUserRequest
  ): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-admin/edit/${userId}`,
      updateUser
    );
  }

  updateUserPassword(
    userId: string,
    updatePassword: UpdateUserPasswordRequest
  ): Observable<string> {
    return this.http.put<string>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-admin/edit/${userId}/password`,
      updatePassword
    );
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-admin/roles`
    );
  }

  addUserRole(userId: string, role: RoleRequest): Observable<string> {
    return this.http.put<string>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-admin/roles/${userId}`,
      role
    );
  }

  removeUserRole(userId: string, role: RoleRequest): Observable<string> {
    return this.http.delete<string>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-admin/roles/${userId}`,
      {
        body: role,
      }
    );
  }

  adminSearchUsers(
    query: string,
    page = 1,
    limit = 10
  ): Observable<UserResults> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page)
      .set('limit', limit);

    return this.http.get<UserResults>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-admin/search`,
      { params }
    );
  }

  adminDeleteUser(userId: string): Observable<string> {
    return this.http.delete<string>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-admin/delete/${userId}`
    );
  }
}
