import { UserModel } from './user.models';

export interface AuthStateModel {
  user: UserModel | null;
}
