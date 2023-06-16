import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.less'],
})
export class MessagingComponent implements OnInit, OnDestroy {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  authUserId = '';

  isOnPhone = false;

  @ViewChild('messages') messages!: ElementRef;

  activeUserId?: string;
  newMessage = '';
  userList = new Set<string>();
  messageList: Message[] = [];

  private socket?: Socket;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private keycloak: KeycloakService,
    private friendshipService: FriendshipService,
    private store: Store,
    private readonly currentRoute: ActivatedRoute
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isOnPhone = result.matches;
      });
    this.user$.subscribe(user => {
      this.authUserId = user.id;
    });
  }
  ngOnInit() {
    this.currentRoute.params.subscribe(params => {
      if (params['id']) {
        this.activeUserId = params['id'];
        this.userList.add(params['id']);
      }
    });

    this.user$.subscribe(user => {
      this.friendshipService.getUserFriends(user.id).subscribe(friends => {
        friends.forEach(friend => this.userList.add(friend.friendId));
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
      this.scrollToBottom();
      this.updateUserList();
    });
    this.socket.on('newMessage', message => {
      this.messageList.push(message);
      this.scrollToBottom();
      this.updateUserList();
    });
    this.socket.on('deletedMessage', message => {
      this.messageList = this.messageList.filter(message.messageId);
      this.scrollToBottom();
    });
    this.socket.emit('getMessages');
  }

  ngOnDestroy() {
    this.socket?.disconnect();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.socket?.emit('sendMessage', {
        text: this.newMessage,
        receiverId: this.activeUserId,
      });
      this.newMessage = '';
    }
  }

  deleteMessage(messageId: string) {
    this.socket?.emit('deleteMessage', {
      messageId,
    });
    this.messageList = this.messageList.filter(
      message => message.id !== messageId
    );
  }

  private updateUserList() {
    this.messageList.forEach(message =>
      this.userList.add(
        message.senderId === this.authUserId
          ? message.receiverId
          : message.senderId
      )
    );
  }

  selectUser(userId: string) {
    this.activeUserId = userId;
    this.scrollToBottom();
  }

  isSelected(userId: string) {
    return this.activeUserId === userId;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messages.nativeElement.scrollTop =
        this.messages.nativeElement.scrollHeight;
    }, 300);
  }
}
