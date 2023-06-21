export interface WatchTogetherStateModel {
  invitedRooms: WatchTogetherRoom[];
  joinedRoom?: WatchTogetherRoom;
}

export interface WatchTogetherRoom {
  id: string;
  ownerId: string;
  joinedSessions: string[];
  invitedUsers: string[];
  mediaIds: number[];
  mediaType: 'tv-shows' | 'movies';
  playlistPosition: number;
  position: number;
  status: WatchTogetherStatus;
  autoplay: boolean;
}

export enum WatchTogetherStatus {
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
}

export interface CreateWatchTogetherRoomRequest {
  invitedUsers: string[];
  mediaIds: number[];
  mediaType: 'tv-shows' | 'movies';
  playlistPosition: number;
}

export interface SessionIdResponse {
  sessionId: string;
}
