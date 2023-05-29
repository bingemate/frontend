import { Playlist } from './playlist.model';

export interface StreamingStateModel {
  playlist?: Playlist;
  position: number;
  autoplay: boolean;
}
