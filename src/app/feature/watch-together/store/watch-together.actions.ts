import {
  CreateWatchTogetherRoomRequest,
  WatchTogetherRoom,
} from '../../../shared/models/watch-together.models';

export namespace WatchTogetherActions {
  export class SetRooms {
    static readonly type = '[WatchTogether] Set Rooms';
    constructor(public rooms: WatchTogetherRoom[]) {}
  }
  export class UpdateJoinedRoom {
    static readonly type = '[WatchTogether] Update Joined Room';
    constructor(public room: WatchTogetherRoom) {}
  }
  export class RoomJoined {
    static readonly type = '[WatchTogether] Room Joined';
    constructor(public room: WatchTogetherRoom) {}
  }
  export class LeaveRoom {
    static readonly type = '[WatchTogether] Leave Room';
  }
  export class AddRoom {
    static readonly type = '[WatchTogether] Add Room';
    constructor(public room: WatchTogetherRoom) {}
  }
  export class CreateRoom {
    constructor(public request: CreateWatchTogetherRoomRequest) {}
  }
}
