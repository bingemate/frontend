import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../core/auth/store/auth.state';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { Message } from '../../../shared/models/messaging.model';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../../shared/models/user.models';
import { FriendshipService } from '../../../feature/friendship/friendship.service';
import { MessagingService } from '../../../feature/messaging/messaging.service';
import { MessagingState } from '../../../feature/messaging/store/messaging.state';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MessagingActions } from '../../../feature/messaging/store/messaging.actions';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.less'],
})
export class MessagingComponent implements OnInit, OnDestroy {
  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  @Select(MessagingState.users)
  users$!: Observable<string[]>;
  @Select(MessagingState.messages)
  messages$!: Observable<Message[]>;
  authUserId = '';

  isOnPhone = false;

  @ViewChild('messages') messages!: ElementRef;

  activeUserId?: string;
  newMessage = '';
  userList: string[] = [];
  messageList: Message[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private friendshipService: FriendshipService,
    private readonly currentRoute: ActivatedRoute,
    private messagingService: MessagingService,
    private readonly store: Store
  ) {}
  ngOnInit() {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.subscriptions.push(
      this.currentRoute.params.subscribe(params => {
        if (params['id']) {
          this.activeUserId = params['id'];
          this.userList.push(params['id']);
        }
      })
    );
    this.store.dispatch(new MessagingActions.ClearUnreadMessages());
    this.subscriptions.push(
      this.user$
        .pipe(
          filter(user => user !== null && user !== undefined),
          switchMap(user => {
            this.authUserId = user.id;
            return this.friendshipService.getUserFriends(user.id);
          })
        )
        .subscribe(friends =>
          this.setUserList(friends.map(friend => friend.friendId))
        )
    );
    this.messages$.subscribe(messages => (this.messageList = messages));
    this.users$.subscribe(users => this.setUserList(users));
  }

  setUserList(users: string[]) {
    this.userList = [...new Set([...users, ...this.userList])];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messagingService.sendMessage({
        text: this.newMessage,
        receiverId: this.activeUserId,
      });
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  deleteMessage(messageId: string) {
    this.messagingService.deleteMessage(messageId);
    this.messageList = this.messageList.filter(
      message => message.id !== messageId
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
