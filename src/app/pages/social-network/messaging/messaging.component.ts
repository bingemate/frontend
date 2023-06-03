import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/models/messaging.model';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../../shared/models/user.models';
import { FriendshipService } from '../../../feature/friendship/friendship.service';
import { FriendResponse } from '../../../shared/models/friendship.models';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.less'],
})
export class MessagingComponent implements OnInit, OnDestroy {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  authUserId = '';

  activeFriendId?: string;
  newMessage = '';
  userList = new Set<string>();
  messageList: Message[] = [];

  friendList: FriendResponse[] = [];
  friendLoading = false;

  private socket?: Socket;

  constructor(
    private keycloak: KeycloakService,
    private friendshipService: FriendshipService,
    private store: Store,
    private readonly currentRoute: ActivatedRoute
  ) {
    this.user$.subscribe(user => {
      this.authUserId = user.id;
    });
  }
  ngOnInit() {
    this.currentRoute.params.subscribe(params => {
      if (params['id']) {
        this.activeFriendId = params['id'];
      }
    });

    this.user$.subscribe(user => {
      this.friendLoading = true;
      this.friendshipService.getUserFriends(user.id).subscribe(friends => {
        this.friendLoading = false;
        this.friendList = friends;
      });
    });

    this.setupSocket().then();
  }

  private async setupSocket() {
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
    if (this.newMessage.trim() !== '') {
      this.socket?.emit('sendMessage', {
        text: this.newMessage,
        receiverId: this.activeFriendId,
      });
      this.newMessage = '';
    }
  }

  private updateUserList() {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    this.messageList.forEach(message =>
      this.userList.add(
        message.senderId === userId ? message.receiverId : message.senderId
      )
    );
  }

  selectFriend(userId: string) {
    this.activeFriendId = userId;
  }

  isSelected(userId: string) {
    return this.activeFriendId === userId;
  }
}
