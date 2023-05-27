export namespace MediaSearchActions {
  export class Search {
    static readonly type = '[MediaSearch] Search';

    constructor(public payload: { query: string }) {}
  }

  export class SearchMovie {
    static readonly type = '[MediaSearch] Page Movie';

    constructor(public payload: { page: number }) {}
  }

  export class SearchTv {
    static readonly type = '[MediaSearch] Page Tv';

    constructor(public payload: { page: number }) {}
  }
}
