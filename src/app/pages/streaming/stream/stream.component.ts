import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { StreamUpdateEvent } from '../../../shared/models/streaming.model';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import {
  MovieResponse,
  TvEpisodeResponse,
} from '../../../shared/models/media.models';
import { Select } from '@ngxs/store';
import { EpisodePlaylist } from '../../../shared/models/episode-playlist.model';
import { MoviePlaylist } from '../../../shared/models/movie-playlist.model';
import { StreamingState } from '../../../feature/streaming/store/streaming.state';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.less'],
})
export class StreamComponent implements OnInit, OnDestroy {
  @Select(StreamingState.episodePlaylist)
  episodePlaylist$!: Observable<EpisodePlaylist>;
  @Select(StreamingState.moviePlaylist)
  moviePlaylist$!: Observable<MoviePlaylist>;
  mediaId = 0;
  type?: 'tv-shows' | 'movies';
  mediaFile: MediaFile | undefined;
  mediaInfo: MovieResponse | TvEpisodeResponse | undefined;
  error: string | undefined;
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
          this.type = params['type'];
          return forkJoin([
            this.type === 'movies'
              ? this.mediaInfoService.getMovieFileInfos(this.mediaId)
              : this.mediaInfoService.getEpisodeFileInfos(this.mediaId),
            this.type === 'movies'
              ? this.mediaInfoService.getMovieInfo(this.mediaId)
              : this.mediaInfoService.getTvShowEpisodeInfoById(this.mediaId),
          ]);
        })
      )
      .subscribe({
        next: async ([mediaFile, mediaInfo]) => {
          this.mediaInfo = mediaInfo;
          this.mediaFile = mediaFile;
          await this.openSocketConnection();
          if (this.route.snapshot.queryParamMap.has('progress')) {
            this.progress =
              mediaFile.duration *
              Number.parseFloat(
                this.route.snapshot.queryParamMap.get('progress') || '0'
              );
          }
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

  private async openSocketConnection() {
    if (this.socket) {
      this.socket.close();
    }
    const key = await this.keycloak.getToken();
    this.socket = io(`${environment.websocketUrl}`, {
      transports: ['polling'],
      extraHeaders: { Authorization: `Bearer ${key}` },
      path: '/dev/watch-service/socket.io',
      query: { mediaId: this.mediaId, type: this.type },
    });
    this.keycloak.keycloakEvents$.subscribe(async event => {
      if (event.type === KeycloakEventType.OnTokenExpired && this.socket) {
        const key = await this.keycloak.getToken();
        this.socket.auth = { Authorization: `Bearer ${key}` };
      }
    });
    this.socket.connect();
  }
}
