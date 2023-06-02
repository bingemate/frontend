import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../../../feature/friendship/friendship.service';
import { FriendResponse } from '../../../shared/models/friendship.models';

@Component({
  selector: 'app-friendship',
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.less'],
})
export class FriendshipComponent implements OnInit {
  friends: FriendResponse[] = [];
  pendingFriends: FriendResponse[] = [];
  friendRequests: FriendResponse[] = [];
  loading = false;

  constructor(private readonly friendshipService: FriendshipService) {}

  ngOnInit() {
    this.getRelationship();
  }

  getRelationship() {
    this.loading = true;
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
    });
  }
}
