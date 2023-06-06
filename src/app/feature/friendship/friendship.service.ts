import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import {
  AddFriendRequest,
  FriendResponse,
  UpdateFriendRequest,
} from '../../shared/models/friendship.models';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  constructor(private readonly http: HttpClient) {}

  /*getUsername(userId: string): Observable<UsernameResponse> {
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
  }*/

  getFriendships(): Observable<FriendResponse[]> {
    return this.http.get<FriendResponse[]>(
      `${API_RESOURCE_URI.USER_SERVICE}/friends`
    );
  }

  getUserFriends(userId: string): Observable<FriendResponse[]> {
    return this.http.get<FriendResponse[]>(
      `${API_RESOURCE_URI.USER_SERVICE}/friends/user/${userId}`
    );
  }

  getRelationships(): Observable<FriendResponse[]> {
    return this.http.get<FriendResponse[]>(
      `${API_RESOURCE_URI.USER_SERVICE}/friends/relations`
    );
  }

  getRelationShip(friendId: string): Observable<FriendResponse> {
    return this.http.get<FriendResponse>(
      `${API_RESOURCE_URI.USER_SERVICE}/friends/${friendId}`
    );
  }

  addFriend(friendRequest: AddFriendRequest): Observable<FriendResponse> {
    return this.http.post<FriendResponse>(
      `${API_RESOURCE_URI.USER_SERVICE}/friends`,
      friendRequest
    );
  }

  updateFriend(friendRequest: UpdateFriendRequest): Observable<FriendResponse> {
    return this.http.put<FriendResponse>(
      `${API_RESOURCE_URI.USER_SERVICE}/friends`,
      friendRequest
    );
  }

  deleteFriend(friendId: string): Observable<void> {
    return this.http.delete<void>(
      `${API_RESOURCE_URI.USER_SERVICE}/friends/${friendId}`
    );
  }
}
