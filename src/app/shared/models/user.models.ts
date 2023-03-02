export interface UserModel {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  role: Role;
}

export interface UserAPIResponse {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  role: Role;
}

export type Role = 'admin' | 'user';

export function toUserModel(response: UserAPIResponse): UserModel {
  return {
    id: response.id,
    username: response.username,
    firstname: response.firstname,
    lastname: response.lastname,
    birthdate: response.birthdate,
    email: response.email,
    role: response.role,
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
    role: model.role,
  };
}

export function toUsersModel(response: UserAPIResponse[]): UserModel[] {
  return response.map(toUserModel);
}

export function toUsersAPIResponse(model: UserModel[]): UserAPIResponse[] {
  return model.map(toUserAPIResponse);
}
