import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { forkJoin, switchMap } from 'rxjs';
import { StreamUpdateEvent } from '../../../shared/models/streaming.model';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.less'],
})
export class StreamComponent implements OnInit, OnDestroy {
  mediaId = 0;
  mediaFile: MediaFile | undefined;
  error: string | undefined;
  mediaTitle = 'undefined';
  progress = 0;
  socket?: Socket;

  constructor(
    private route: ActivatedRoute,
    private keycloak: KeycloakService,
    private mediaInfoService: MediaInfoService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.mediaId = parseInt(params['id']);
          return forkJoin([
            this.mediaInfoService.getFileInfos(this.mediaId),
            this.mediaInfoService.getMediaInfo(this.mediaId),
          ]);
        })
      )
      .subscribe({
        next: ([mediaFile, mediaInfo]) => {
          this.mediaFile = mediaFile;
          if (this.route.snapshot.queryParamMap.has('progress')) {
            this.progress =
              mediaFile.duration *
              Number.parseFloat(
                this.route.snapshot.queryParamMap.get('progress') || '0'
              );
          }
          this.mediaTitle = mediaInfo.name;
          this.openSocketConnection();
        },
        error: err => {
          console.error(err.error.error);
          this.error = err.error.error;
        },
      });
  }
  ngOnDestroy(): void {
    this.socket?.close();
  }

  onStreamUpdate(event: StreamUpdateEvent) {
    this.socket?.emit('updateMediaHistory', event);
  }

  private openSocketConnection() {
    if (this.socket) {
      this.socket.close();
    }
    this.keycloak.getToken().then(
      key =>
        (this.socket = io(`${environment.apiUrl}`, {
          transports: ['polling'],
          extraHeaders: { Authorization: `Bearer ${key}` },
          path: '/dev/watch-service/socket.io',
          query: { mediaId: this.mediaId },
        }))
    );
  }
}
