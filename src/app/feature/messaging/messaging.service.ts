import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { MessagingActions } from './store/messaging.actions';
import { AuthState } from '../../core/auth/store/auth.state';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';
import { SessionIdResponse } from '../../shared/models/watch-together.models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private socket?: Socket;
  constructor(
    private http: HttpClient,
    private store: Store,
    private notificationsService: NotificationsService
  ) {}

  async startMessagingSocket() {
    this.getToken().subscribe(token => this.initSocketConnection(token));
  }

  private async initSocketConnection(token: string) {
    this.socket = io(`${environment.websocketUrl}`, {
      transports: ['polling'],
      auth: { token },
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
    this.socket.emit('getMessages');
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

  private getToken() {
    return this.http
      .get<SessionIdResponse>(
        `${API_RESOURCE_URI.MESSAGING_SERVICE}/messaging/session`
      )
      .pipe(map(id => id.sessionId));
  }
}
