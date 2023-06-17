import {
  CreateWatchTogetherRoomRequest,
  WatchTogetherRoom,
} from '../../../shared/models/watch-together.models';

export namespace WatchTogetherActions {
  export class SetRooms {
    static readonly type = '[WatchTogether] Set Rooms';
    constructor(public rooms: WatchTogetherRoom[]) {}
  }
  export class JoinRoom {
    static readonly type = '[WatchTogether] Join Room';
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
