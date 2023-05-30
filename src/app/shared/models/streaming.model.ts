import { Playlist } from './playlist.model';

export interface StreamingStateModel {
  playlist?: Playlist;
  position: number;
  autoplay: boolean;
}

export enum StreamStatusEnum {
  STARTED = 'STARTED',
  PLAYING = 'PLAYING',
  STOPPED = 'STOPPED',
}

export interface StreamUpdateEvent {
  watchStatus: StreamStatusEnum;
  stoppedAt: number;
}
