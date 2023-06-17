import { Message } from '../../../shared/models/messaging.model';

export namespace MessagingActions {
  export class SetMessages {
    static readonly type = '[Messaging] Set Messages';
    constructor(public messages: Message[]) {}
  }
  export class AddMessage {
    static readonly type = '[Messaging] Add Message';
    constructor(public message: Message) {}
  }
  export class RemoveMessage {
    static readonly type = '[Messaging] Remove Message';
    constructor(public messageId: string) {}
  }

  export class ClearUnreadMessages {
    static readonly type = '[Messaging] Clear Unread Messages';
  }
}
