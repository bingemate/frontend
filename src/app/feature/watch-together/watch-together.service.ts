import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { CreateWatchTogetherRoomRequest } from '../../shared/models/watch-together.models';
import { WatchTogetherActions } from './store/watch-together.actions';
import { StreamingActions } from '../streaming/store/streaming.actions';

@Injectable({
  providedIn: 'root',
})
export class WatchTogetherService {
  private socket?: Socket;
  constructor(
    private keycloak: KeycloakService,
    private store: Store,
    private notificationsService: NotificationsService
  ) {}

  async startWatchTogetherSocket() {
    await this.initSocketConnection();
    this.socket?.emit('getMessages');
    this.keycloak.keycloakEvents$.subscribe(async event => {
      if (event.type === KeycloakEventType.OnTokenExpired) {
        await this.keycloak.updateToken(1);
      } else if (
        this.socket &&
        event.type === KeycloakEventType.OnAuthRefreshSuccess
      ) {
        this.socket.disconnect();
        await this.initSocketConnection();
      }
    });
  }

  private async initSocketConnection() {
    const key = await this.keycloak.getToken();
    this.socket = io(`${environment.websocketUrl}/watch-together`, {
      transports: ['polling'],
      extraHeaders: { Authorization: `Bearer ${key}` },
      path: `${environment.production ? '' : '/dev'}/watch-service/socket.io`,
    });
    this.socket.on('invitedToRoom', room => {
      this.notificationsService.info('Invitation à une lecture partagée');
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
  getRoomStatus() {
    this.socket?.emit('getRoomStatus');
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
}
