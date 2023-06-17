import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { filter, forkJoin, Observable, Subscription, switchMap } from 'rxjs';
import { StreamUpdateEvent } from '../../../shared/models/streaming.model';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import {
  MovieResponse,
  TvEpisodeResponse,
} from '../../../shared/models/media.models';
import { Select, Store } from '@ngxs/store';
import { EpisodePlaylist } from '../../../shared/models/episode-playlist.model';
import { MoviePlaylist } from '../../../shared/models/movie-playlist.model';
import { StreamingState } from '../../../feature/streaming/store/streaming.state';
import { StreamingActions } from '../../../feature/streaming/store/streaming.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WatchTogetherState } from '../../../feature/watch-together/store/watch-together.state';
import { WatchTogetherRoom } from '../../../shared/models/watch-together.models';
import { WatchTogetherService } from '../../../feature/watch-together/watch-together.service';

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
  @Select(WatchTogetherState.joinedRoom)
  room$!: Observable<WatchTogetherRoom>;
  mediaId = 0;
  type?: 'tv-shows' | 'movies';
  mediaFile: MediaFile | undefined;
  mediaInfo: MovieResponse | TvEpisodeResponse | undefined;
  error: string | undefined;
  progress = 0;
  socket?: Socket;
  subscriptions: Subscription[] = [];

  isOnPhone = false;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private keycloak: KeycloakService,
    private mediaInfoService: MediaInfoService,
    private watchTogetherService: WatchTogetherService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
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
            if (this.type === 'tv-shows') {
              this.subscriptions.push(
                this.episodePlaylist$
                  .pipe(
                    filter(episodes => !episodes),
                    switchMap(() =>
                      this.mediaInfoService.getAvailableEpisodes(
                        (mediaInfo as TvEpisodeResponse).tvShowId
                      )
                    )
                  )
                  .subscribe(episodes =>
                    this.store.dispatch(
                      new StreamingActions.WatchEpisodePlaylist(
                        {
                          id: '',
                          name: 'Lecture automatique',
                          userId: '',
                          items: episodes.map(episodeId => ({
                            episodeId,
                          })),
                        },
                        episodes.indexOf(this.mediaId),
                        false
                      )
                    )
                  )
              );
            }
          },
          error: err => {
            console.error(err.error.error);
            this.error = err.error.error;
          },
        })
    );
  }
  ngOnDestroy(): void {
    this.socket?.close();
    this.store.dispatch(new StreamingActions.ClearPlaylist());
    this.subscriptions.push(
      this.room$
        .pipe(filter(room => room !== null && room !== undefined))
        .subscribe(() => this.watchTogetherService.leaveRoom())
    );
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onStreamUpdate(event: StreamUpdateEvent) {
    this.socket?.emit('updateMediaHistory', event);
  }

  private async openSocketConnection() {
    if (this.socket) {
      this.socket.close();
    }
    await this.initSocketConnection();
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
    this.keycloak.keycloakEvents$.subscribe(async event => {
      if (event.type === KeycloakEventType.OnTokenExpired && this.socket) {
        const key = await this.keycloak.getToken();
        this.socket.auth = { Authorization: `Bearer ${key}` };
      }
    });
  }

  private async initSocketConnection() {
    const key = await this.keycloak.getToken();
    this.socket = io(`${environment.websocketUrl}`, {
      transports: ['polling'],
      extraHeaders: { Authorization: `Bearer ${key}` },
      path: `${environment.production ? '' : '/dev'}/watch-service/socket.io`,
      query: { mediaId: this.mediaId, type: this.type },
    });
  }
}
