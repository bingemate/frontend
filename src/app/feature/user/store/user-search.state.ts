import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserSearchStateModel } from '../../../shared/models/user.models';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { UserSearchActions } from './user-search.actions';

@State<UserSearchStateModel>({
  name: 'userSearch',
  defaults: {
    query: '',
    users: [],
    userSearchLoading: false,
  },
})
@Injectable()
export class UserSearchState {
  constructor(private readonly userService: UserService) {}

  @Selector()
  static query(state: UserSearchStateModel) {
    return state.query;
  }

  @Selector()
  static users(state: UserSearchStateModel) {
    return state.users;
  }

  @Selector()
  static userSearchLoading(state: UserSearchStateModel) {
    return state.userSearchLoading;
  }

  @Action(UserSearchActions.Search)
  search(
    ctx: StateContext<UserSearchStateModel>,
    action: UserSearchActions.Search
  ) {
    ctx.patchState({
      query: action.payload.query,
      userSearchLoading: true,
    });
    this.userService
      .searchUsers(action.payload.query, action.payload.includeRoles)
      .subscribe(response => {
        ctx.patchState({
          users: response,
          userSearchLoading: false,
        });
      });
  }
}
