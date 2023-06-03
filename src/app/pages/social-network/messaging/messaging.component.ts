import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Observable } from 'rxjs';
import { UserModel } from '../../../shared/models/user.models';
import { Message } from '../../../shared/models/messaging.model';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.less'],
})
export class MessagingComponent implements OnInit, OnDestroy {
  @Select(AuthState.user)
  user$!: Observable<UserModel>;
  activeUser?: string;
  newMessage = '';
  userList = new Set<string>();
  messageList: Message[] = [];
  private socket?: Socket;

  constructor(
    private keycloak: KeycloakService,
    private store: Store,
    private readonly currentRoute: ActivatedRoute
  ) {}
  async ngOnInit() {
    this.currentRoute.params.subscribe(params => {
      if (params['id']) {
        this.activeUser = params['id'];
        this.userList.add(params['id']);
      }
    });
    const key = await this.keycloak.getToken();
    this.socket = io(`${environment.websocketUrl}`, {
      transports: ['polling'],
      extraHeaders: { Authorization: `Bearer ${key}` },
      path: '/dev/messaging-service/socket.io',
    });
    this.socket.on('messages', message => {
      this.messageList = message;
      this.updateUserList();
    });
    this.socket.on('newMessage', message => {
      this.messageList.push(message);
      this.updateUserList();
    });
    this.socket.on(
      'deletedMessage',
      message => (this.messageList = this.messageList.filter(message.messageId))
    );
    this.socket.emit('getMessages');
  }
  ngOnDestroy() {
    this.socket?.disconnect();
  }

  sendMessage() {
    this.socket?.emit('sendMessage', {
      text: this.newMessage,
      receiverId: this.activeUser,
    });
    this.newMessage = '';
  }

  private updateUserList() {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    this.messageList.forEach(message =>
      this.userList.add(
        message.senderId === userId ? message.receiverId : message.senderId
      )
    );
  }

  selectUser(user: string) {
    this.activeUser = user;
  }
}
