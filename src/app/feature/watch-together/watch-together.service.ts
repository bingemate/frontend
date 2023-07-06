import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { KeycloakService } from 'keycloak-angular';
import { io, Socket } from 'socket.io-client';
import {
  CreateWatchTogetherRoomRequest,
  SessionIdResponse,
  WatchTogetherRoom,
} from '../../shared/models/watch-together.models';
import { WatchTogetherActions } from './store/watch-together.actions';
import { StreamingActions } from '../streaming/store/streaming.actions';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resources-uri';

@Injectable({
  providedIn: 'root',
})
export class WatchTogetherService {
  private socket?: Socket;
  notificationCb?: (room: WatchTogetherRoom) => void;

  constructor(
    private keycloak: KeycloakService,
    private store: Store,
    private readonly http: HttpClient
  ) {}

  async startWatchTogetherSocket() {
    this.getSessionId().subscribe(sessionId => {
      this.initSocketConnection(sessionId);
      this.getRooms();
    });
  }

  private initSocketConnection(sessionId: string) {
    this.socket = io(`${environment.watchWebsocketUrl}/watch-together`, {
      transports: ['websocket'],
      auth: { token: sessionId },
    });
    this.socket.on('invitedToRoom', room => {
      this.notificationCb?.(room);
      this.store.dispatch(new WatchTogetherActions.AddRoom(room));
    });
    this.socket.on('rooms', rooms =>
      this.store.dispatch(new WatchTogetherActions.SetRooms(rooms))
    );
    this.socket.on('roomStatus', room =>
      this.store.dispatch(new WatchTogetherActions.UpdateJoinedRoom(room))
    );
    this.socket.on('roomJoined', room =>
      this.store.dispatch(new WatchTogetherActions.RoomJoined(room))
    );
    this.socket.on('roomCreated', roomId => this.joinRoom(roomId));
    this.socket.on('addedMedia', mediaId =>
      this.store.dispatch(new StreamingActions.AddMedia(mediaId))
    );
  }

  createRoom(room: CreateWatchTogetherRoomRequest) {
    this.socket?.emit('createRoom', room);
  }

  getRooms() {
    this.socket?.emit('getRooms');
  }

  joinRoom(roomId: string) {
    this.socket?.emit('joinRoom', roomId);
  }

  leaveRoom() {
    this.socket?.emit('leaveRoom');
    this.store.dispatch(new WatchTogetherActions.LeaveRoom());
  }

  pause() {
    this.socket?.emit('pause');
  }

  play() {
    this.socket?.emit('play');
  }

  playing(position: number) {
    this.socket?.emit('playing', position);
  }

  seek(position: number) {
    this.socket?.emit('seek', position);
  }

  addMedia(mediaId: number) {
    this.socket?.emit('addMedia', mediaId);
  }

  changeMedia(playlistPosition: number) {
    this.socket?.emit('changeMedia', playlistPosition);
  }

  closeSocket() {
    this.socket?.disconnect();
  }

  private getSessionId() {
    return this.http
      .get<SessionIdResponse>(
        `${API_RESOURCE_URI.WATCH_SERVICE}/watch-together/session`
      )
      .pipe(map(id => id.sessionId));
  }
}
