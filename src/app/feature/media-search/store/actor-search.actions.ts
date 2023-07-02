export namespace ActorSearchActions {
  export class Search {
    static readonly type = '[ActorSearch] Search';

    constructor(public payload: { query: string; page: number }) {}
  }

  export class PageChange {
    static readonly type = '[ActorSearch] Page Change';

    constructor(public payload: number) {}
  }

  export class Adult {
    static readonly type = '[ActorSearch] Adult';

    constructor(public payload: boolean) {}
  }
}
