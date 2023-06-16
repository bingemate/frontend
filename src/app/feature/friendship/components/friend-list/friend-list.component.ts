import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FriendResponse,
  FriendState,
} from '../../../../shared/models/friendship.models';
import { FriendshipService } from '../../friendship.service';
import { userProfilViewLinks } from '../../../../pages/social-network/social-network-routing.module';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.less'],
})
export class FriendListComponent {
  isOnPhone = false;

  @Input() friends: FriendResponse[] = [];
  @Input() canAccept = false;
  @Input() canReject = false;
  @Input() canBlock = false;
  @Input() canDelete = false;

  @Output()
  friendUpdated: EventEmitter<void> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly friendshipService: FriendshipService,
    private readonly notificationsService: NotificationsService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isOnPhone = result.matches;
      });
  }

  protected readonly userProfilViewLinks = userProfilViewLinks;
  protected readonly FriendState = FriendState;

  acceptFriend(friendId: string) {
    this.friendshipService
      .updateFriend({
        friendId,
        state: FriendState.ACCEPTED,
      })
      .subscribe(() => {
        this.notificationsService.success('Demande acceptée');
        this.friendUpdated.emit();
      });
  }

  rejectFriend(friendId: string) {
    this.friendshipService
      .updateFriend({
        friendId,
        state: FriendState.REJECTED,
      })
      .subscribe(() => {
        this.notificationsService.success('Demande rejetée');
        this.friendUpdated.emit();
      });
  }

  blockFriend(friendId: string) {
    this.friendshipService
      .updateFriend({
        friendId,
        state: FriendState.BLOCKED,
      })
      .subscribe(() => {
        this.notificationsService.success('Utilisateur bloqué');
        this.friendUpdated.emit();
      });
  }

  deleteFriend(friendId: string) {
    this.friendshipService.deleteFriend(friendId).subscribe(() => {
      this.notificationsService.success('Ami supprimé');
      this.friendUpdated.emit();
    });
  }

  mapStateToLabel(state: FriendState): string {
    switch (state) {
      case FriendState.REQUESTED:
        return 'Demande en attente';
      case FriendState.ACCEPTED:
        return 'Ami';
      case FriendState.REJECTED:
        return 'Demande rejetée';
      case FriendState.BLOCKED:
        return 'Bloqué';
      default:
        return '';
    }
  }
}
