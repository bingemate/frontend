import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MessagingActions } from './messaging.actions';
import { MessagingStateModel } from '../../../shared/models/messaging.model';
import { AuthState } from '../../../core/auth/store/auth.state';

@State<MessagingStateModel>({
  name: 'messaging',
  defaults: {
    messages: [],
    users: [],
  },
})
@Injectable()
export class MessagingState {
  constructor(private store: Store) {}

  @Selector()
  static messages(state: MessagingStateModel) {
    return state.messages;
  }
  @Selector()
  static users(state: MessagingStateModel) {
    return state.users;
  }

  @Action(MessagingActions.SetMessages)
  setMessages(
    ctx: StateContext<MessagingStateModel>,
    payload: MessagingActions.SetMessages
  ) {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    ctx.patchState({
      messages: payload.messages,
      users: [
        ...new Set(
          payload.messages.map(message =>
            message.senderId === userId ? message.receiverId : message.senderId
          )
        ),
      ],
    });
  }

  @Action(MessagingActions.AddMessage)
  addMessage(
    ctx: StateContext<MessagingStateModel>,
    payload: MessagingActions.AddMessage
  ) {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    ctx.patchState({
      users: [
        ...new Set(ctx.getState().users).add(
          userId === payload.message.senderId
            ? payload.message.receiverId
            : payload.message.senderId
        ),
      ],
      messages: [...ctx.getState().messages, payload.message],
    });
  }

  @Action(MessagingActions.RemoveMessage)
  removeMessage(
    ctx: StateContext<MessagingStateModel>,
    payload: MessagingActions.RemoveMessage
  ) {
    ctx.patchState({
      messages: ctx
        .getState()
        .messages.filter(message => message.id !== payload.messageId),
    });
  }
}
