import { UserResponse } from './user.models';

export interface AuthStateModel {
  user: UserResponse | null;
}
