export namespace HistoryActions {
  export class GetAll {
    static readonly type = '[History] Get All';
  }
  export class DeleteFromHistory {
    static readonly type = '[History] Delete From History';
    constructor(public readonly mediaId: string) {}
  }
}
