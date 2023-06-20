import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendshipService } from '../../../feature/friendship/friendship.service';
import { FriendResponse } from '../../../shared/models/friendship.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friendship',
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.less'],
})
export class FriendshipComponent implements OnInit, OnDestroy {
  isOnPhone = false;

  friends: FriendResponse[] = [];
  pendingFriends: FriendResponse[] = [];
  friendRequests: FriendResponse[] = [];
  loading = false;

  subscriptions: Subscription[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly friendshipService: FriendshipService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.getRelationship();
  }

  getRelationship() {
    this.loading = true;
    this.subscriptions.push(
      this.friendshipService.getRelationships().subscribe(friends => {
        this.loading = false;
        this.friends = friends.filter(friend => friend.state === 'ACCEPTED');
        this.pendingFriends = friends.filter(
          friend =>
            (friend.state === 'REQUESTED' ||
              friend.state === 'REJECTED' ||
              friend.state === 'BLOCKED') &&
            friend.requester
        );
        this.friendRequests = friends.filter(
          friend =>
            (friend.state === 'REQUESTED' ||
              friend.state === 'REJECTED' ||
              friend.state === 'BLOCKED') &&
            !friend.requester
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
