export interface UserModel {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  roles: Role[];
}

export interface UserAPIResponse {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  roles: Role[];
}

export type Role = 'admin' | 'user';

export function isMatchingRoles(
  user: UserModel | null,
  requiredRoles: Role[]
): boolean {
  return (
    user?.roles.includes('admin') ||
    requiredRoles.every(requiredRole => user?.roles.includes(requiredRole))
  );
}

export function toUserModel(response: UserAPIResponse): UserModel {
  return {
    id: response.id,
    username: response.username,
    firstname: response.firstname,
    lastname: response.lastname,
    birthdate: response.birthdate,
    email: response.email,
    roles: response.roles,
  };
}

export function toUserAPIResponse(model: UserModel): UserAPIResponse {
  return {
    id: model.id,
    username: model.username,
    firstname: model.firstname,
    lastname: model.lastname,
    birthdate: model.birthdate,
    email: model.email,
    roles: model.roles,
  };
}

export function toUsersModel(response: UserAPIResponse[]): UserModel[] {
  return response.map(toUserModel);
}

export function toUsersAPIResponse(model: UserModel[]): UserAPIResponse[] {
  return model.map(toUserAPIResponse);
}
