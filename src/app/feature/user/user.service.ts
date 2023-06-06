import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  RoleRequest,
  UpdateUserPasswordRequest,
  UpdateUserRequest,
  UsernameResponse,
  UserResponse,
  UserResults,
} from '../../shared/models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUsername(userId: string): Observable<UsernameResponse> {
    return this.http.get<UsernameResponse>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-info/username/${userId}`
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

  getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${API_RESOURCE_URI.KEYCLOAK_SERVICE}/user-info/${userId}`
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
}
