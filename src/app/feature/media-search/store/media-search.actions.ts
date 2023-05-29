export namespace MediaSearchActions {
  export class Search {
    static readonly type = '[MediaSearch] Search';

    constructor(public payload: { query: string; onlyAvailable: boolean }) {}
  }

  export class SearchMovie {
    static readonly type = '[MediaSearch] Page Movie';

    constructor(public payload: { page: number; onlyAvailable: boolean }) {}
  }

  export class SearchTv {
    static readonly type = '[MediaSearch] Page Tv';

    constructor(public payload: { page: number; onlyAvailable: boolean }) {}
  }
}
