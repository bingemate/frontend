export namespace UserSearchActions {
  export class Search {
    static readonly type = '[UserSearch] Search';

    constructor(public payload: { query: string; includeRoles: boolean }) {}
  }
}
