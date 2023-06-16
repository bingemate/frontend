import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { MessagingActions } from './store/messaging.actions';
import { AuthState } from '../../core/auth/store/auth.state';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private socket?: Socket;
  constructor(
    private keycloak: KeycloakService,
    private store: Store,
    private notificationsService: NotificationsService
  ) {}

  async startMessagingSocket() {
    await this.initSocketConnection();
    this.socket?.emit('getMessages');
    this.keycloak.keycloakEvents$.subscribe(async event => {
      if (event.type === KeycloakEventType.OnTokenExpired) {
        await this.keycloak.updateToken(1);
      } else if (
        this.socket &&
        event.type === KeycloakEventType.OnAuthRefreshSuccess
      ) {
        this.socket.disconnect();
        await this.initSocketConnection();
      }
    });
  }

  private async initSocketConnection() {
    const key = await this.keycloak.getToken();
    this.socket = io(`${environment.websocketUrl}`, {
      transports: ['polling'],
      extraHeaders: { Authorization: `Bearer ${key}` },
      path: `${
        environment.production ? '' : '/dev'
      }/messaging-service/socket.io`,
    });
    this.socket.on('messages', messages =>
      this.store.dispatch(new MessagingActions.SetMessages(messages))
    );
    this.socket.on('newMessage', message => {
      this.store.dispatch(new MessagingActions.AddMessage(message));
      const userId = this.store.selectSnapshot(AuthState.user)?.id;
      if (userId !== message.senderId) {
        this.notificationsService.info('Nouveau message reçu', message.text);
      }
    });
    this.socket.on('deletedMessage', message =>
      this.store.dispatch(new MessagingActions.SetMessages(message.messageId))
    );
  }

  deleteMessage(messageId: string) {
    this.socket?.emit('deleteMessage', {
      messageId,
    });
  }

  sendMessage(message: { receiverId: string | undefined; text: string }) {
    this.socket?.emit('sendMessage', message);
  }

  closeSocket() {
    this.socket?.disconnect();
  }
}
