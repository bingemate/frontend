export class UpdateTheme {
  static readonly type = '[Theme] Update Theme';
  constructor(public theme: string) {}
}

export class ToggleTheme {
  static readonly type = '[Theme] Toggle Theme';
}

export class InitTheme {
  static readonly type = '[Theme] Init Theme';
}
