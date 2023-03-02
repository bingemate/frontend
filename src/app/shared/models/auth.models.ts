import { UserModel } from './user.models';

export interface AuthStateModel {
  token: string | null;
  user: UserModel | null;
}
