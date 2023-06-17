import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { BitrateOptions, VgApiService } from '@videogular/ngx-videogular/core';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resources-uri';
import { Observable, Subscription, throttleTime } from 'rxjs';
import { navigationRoot } from '../../../app-routing.module';
import { mediasLinks } from '../../../pages/medias/medias-routing.module';
import {
  StreamStatusEnum,
  StreamUpdateEvent,
} from '../../../shared/models/streaming.model';
import { Select, Store } from '@ngxs/store';
import {
  MovieResponse,
  TvEpisodeResponse,
} from '../../../shared/models/media.models';
import { StreamingActions } from '../store/streaming.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WatchTogetherState } from '../../watch-together/store/watch-together.state';
import {
  WatchTogetherRoom,
  WatchTogetherStatus,
} from '../../../shared/models/watch-together.models';
import { WatchTogetherService } from '../../watch-together/watch-together.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent implements OnInit, OnChanges, OnDestroy {
  mediaViewLink = `/${navigationRoot.medias.path}/`;
  @Select(WatchTogetherState.joinedRoom)
  room$!: Observable<WatchTogetherRoom>;
  @Select(WatchTogetherState.status)
  status$!: Observable<WatchTogetherStatus>;
  @Select(WatchTogetherState.position)
  position$!: Observable<number>;

  @Input() mediaId: number | undefined;
  @Input() mediaInfo: MovieResponse | TvEpisodeResponse | undefined;
  @Input() mediaFile: MediaFile | undefined;
  @Input() type: 'movies' | 'tv-shows' | undefined;
  @Input() timeSeek = 0;
  @Output() streamUpdate = new EventEmitter<StreamUpdateEvent>();

  isOnPhone = false;

  room?: WatchTogetherRoom;

  audioOptions: BitrateOptions[] = [];
  audioList: string[] = [];

  subtitleList: { srcLang: string; url: string; default: boolean }[] = [];

  videoUrl = '';
  currentAudio = '';
  subscriptions: Subscription[] = [];
  mediaName = '';

  constructor(
    private readonly store: Store,
    private breakpointObserver: BreakpointObserver,
    private watchTogetherService: WatchTogetherService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }

  ngOnInit() {
    this.loadMediaInfo();
    this.loadMediaFileInfo();
    this.room$.subscribe(room => (this.room = room));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['mediaFile'] &&
        !changes['mediaFile'].isFirstChange() &&
        changes['mediaFile'].previousValue !==
          changes['mediaFile'].currentValue) ||
      (changes['mediaId'] &&
        !changes['mediaId'].isFirstChange() &&
        changes['mediaId'].previousValue !== changes['mediaId'].currentValue) ||
      (changes['type'] &&
        !changes['type'].isFirstChange() &&
        changes['type'].previousValue !== changes['type'].currentValue)
    ) {
      this.loadMediaInfo();
      this.loadMediaFileInfo();
    }
  }

  private loadMediaInfo() {
    if (this.type && this.type === 'movies') {
      const movie = this.mediaInfo as MovieResponse;
      this.mediaName = movie.title;
      this.mediaViewLink += `${mediasLinks.movie_view.path}/${this.mediaId}`;
    } else {
      const episode = this.mediaInfo as TvEpisodeResponse;
      this.mediaName = episode.name;
      this.mediaViewLink += `${mediasLinks.tv_show_view.path}/${episode.tvShowId}`;
    }
  }
  private loadMediaFileInfo() {
    if (this.mediaFile && this.type) {
      this.videoUrl = `${API_RESOURCE_URI.STREAMING}/${this.type}/${this.mediaId}/${this.mediaFile.filename}`;
      // console.log(this.videoUrl);
      this.audioOptions = this.mediaFile.audios.map((audioTrack, index) => {
        return {
          qualityIndex: index,
          width: 0,
          height: 0,
          bitrate: 0,
          mediaType: 'audio',
          label: audioTrack.language,
        };
      });
      this.audioList = this.mediaFile.audios.map(
        audioTrack =>
          `${API_RESOURCE_URI.STREAMING}/${this.type}/${this.mediaId}/${audioTrack.filename}`
      );
      this.subtitleList = this.mediaFile.subtitles.map(
        (subtitleTrack, index) => {
          return {
            srcLang: subtitleTrack.language.toLowerCase(),
            url: `${API_RESOURCE_URI.STREAMING}/${this.type}/${this.mediaId}/${subtitleTrack.filename}`,
            default: index === 0,
          };
        }
      );
      this.currentAudio = this.audioList[0];
    }
  }

  onPlayerReady(api: VgApiService) {
    this.position$.subscribe(position => {
      position = api.duration;
      if (position > api.currentTime + 2 || position < api.currentTime - 2) {
        api.seekTime(position);
      }
    });
    this.status$.subscribe(status => {
      if (status === WatchTogetherStatus.PAUSED) {
        api.pause();
      } else if (status === WatchTogetherStatus.PLAYING) {
        api.play();
      }
    });
    this.subscriptions.push(
      api
        .getDefaultMedia()
        .subscriptions.timeUpdate.pipe(
          throttleTime(5000, undefined, {
            leading: true,
          })
        )
        .subscribe(() => {
          const position = api.currentTime / api.duration || 0;
          this.streamUpdate.emit({
            watchStatus: StreamStatusEnum.PLAYING,
            stoppedAt: position,
          });
          if (this.room) {
            this.watchTogetherService.playing(position);
          }
        })
    );
    this.subscriptions.push(
      api.getDefaultMedia().subscriptions.pause.subscribe(() => {
        this.streamUpdate.emit({
          watchStatus: StreamStatusEnum.STOPPED,
          stoppedAt: api.currentTime / api.duration || 0,
        });
        if (this.room) {
          this.watchTogetherService.pause();
        }
      })
    );
    this.subscriptions.push(
      api.getDefaultMedia().subscriptions.play.subscribe(() => {
        this.streamUpdate.emit({
          watchStatus: StreamStatusEnum.STARTED,
          stoppedAt: api.currentTime / api.duration || 0,
        });
        if (this.room) {
          this.watchTogetherService.play();
        }
      })
    );
    this.subscriptions.push(
      api.getDefaultMedia().subscriptions.ended.subscribe(() => {
        this.store.dispatch(new StreamingActions.MediaEndedPlaylist());
        if (
          this.room &&
          this.room.mediaIds.length < this.room.playlistPosition
        ) {
          this.watchTogetherService.changeMedia(this.room.playlistPosition + 1);
        }
      })
    );
    this.subscriptions.push(
      api.getDefaultMedia().subscriptions.seeked.subscribe(() => {
        if (this.room) {
          this.watchTogetherService.seek(api.currentTime / api.duration || 0);
        }
      })
    );
    api.seekTime(this.timeSeek);
  }

  onSelectedAudio(event: BitrateOptions) {
    this.currentAudio = this.audioList[event.qualityIndex];
  }

  mapLang(srcLang: string): string {
    switch (srcLang.toLowerCase()) {
      case 'fra':
      case 'fre':
      case 'fr':
        return 'Français';
      case 'eng':
      case 'en':
        return 'Anglais';
      case 'jpn':
      case 'jp':
        return 'Japonais';
      default:
        return srcLang;
    }
  }

  timeFormat(): string {
    return this.mediaFile?.duration ?? 0 > 3600 ? 'hh:mm:ss' : 'mm:ss';
  }
}
