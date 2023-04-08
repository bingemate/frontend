export namespace ThemeAction {
  export class Update {
    static readonly type = '[Theme] Update Theme';

    constructor(public theme: string) {}
  }

  export class Toggle {
    static readonly type = '[Theme] Toggle Theme';
  }

  export class Init {
    static readonly type = '[Theme] Init Theme';
  }
}
