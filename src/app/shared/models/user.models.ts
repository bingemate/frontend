export interface UserAPIResponse {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  createdTimestamp: number;
  roles: string[];
}

export interface UsernameResponse {
  username: string;
}
export interface UserResponse {
  id: string;
  createdTimestamp: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: string[];
}

export interface UserSearchStateModel {
  query: string;
  users: UserResponse[];
  userSearchLoading: boolean;
}

export function isMatchingRoles(
  user: UserResponse | null,
  requiredRoles: string[]
): boolean {
  return (
    user?.roles.includes('admin') ||
    requiredRoles.every(requiredRole => user?.roles.includes(requiredRole))
  );
}

export function toUserResponse(response: UserAPIResponse): UserResponse {
  return {
    id: response.id,
    username: response.username,
    firstname: response.firstname,
    lastname: response.lastname,
    email: response.email,
    roles: response.roles,
    createdTimestamp: response.createdTimestamp,
  };
}

export function toUserAPIResponse(model: UserResponse): UserAPIResponse {
  return {
    id: model.id,
    username: model.username,
    firstname: model.firstname,
    lastname: model.lastname,
    email: model.email,
    roles: model.roles,
    createdTimestamp: model.createdTimestamp,
  };
}

export function toUsersModel(response: UserAPIResponse[]): UserResponse[] {
  return response.map(toUserResponse);
}

export function toUsersAPIResponse(model: UserResponse[]): UserAPIResponse[] {
  return model.map(toUserAPIResponse);
}
