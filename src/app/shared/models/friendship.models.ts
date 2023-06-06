export enum FriendState {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  BLOCKED = 'BLOCKED',
}

export interface AddFriendRequest {
  friendId: string;
}

export interface UpdateFriendRequest {
  friendId: string;
  state: FriendState;
}

export interface FriendResponse {
  state: FriendState;
  requester: boolean;
  friendId: string;
}
