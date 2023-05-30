import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { BitrateOptions, VgApiService } from '@videogular/ngx-videogular/core';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resources-uri';
import { Subscription, throttleTime } from 'rxjs';
import { navigationRoot } from '../../../app-routing.module';
import { MediaInfoService } from '../../media-info/media-info.service';
import { mediasLinks } from '../../../pages/medias/medias-routing.module';
import {
  StreamStatusEnum,
  StreamUpdateEvent,
} from '../../../shared/models/streaming.model';
import { StreamingActions } from '../store/streaming.actions';
import { Store } from '@ngxs/store';
import { MediaResponse } from '../../../shared/models/media.models';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  mediaViewLink = `/${navigationRoot.medias.path}/`;

  @Input() mediaId: number | undefined;
  @Input() mediaInfo: MediaResponse | undefined;
  @Input() mediaFile: MediaFile | undefined;
  @Input() timeSeek = 0;
  @Output() streamUpdate = new EventEmitter<StreamUpdateEvent>();

  audioOptions: BitrateOptions[] = [];
  audioList: string[] = [];

  subtitleList: { srcLang: string; url: string; default: boolean }[] = [];

  videoUrl = '';
  currentAudio = '';
  subscriptions: Subscription[] = [];

  constructor(
    private mediaInfoService: MediaInfoService,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.loadMediaInfo();
    this.loadMediaFileInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['mediaFile'] &&
      !changes['mediaFile'].isFirstChange() &&
      changes['mediaFile'].previousValue !== changes['mediaFile'].currentValue
    ) {
      this.loadMediaFileInfo();
    }
    if (
      changes['mediaId'] &&
      !changes['mediaId'].isFirstChange() &&
      changes['mediaId'].previousValue !== changes['mediaId'].currentValue
    ) {
      this.loadMediaInfo();
    }
  }

  private loadMediaInfo() {
    if (this.mediaInfo) {
      switch (this.mediaInfo.mediaType) {
        case 'Movie':
          this.mediaViewLink += `${mediasLinks.movie_view.path}/${this.mediaId}`;
          break;
        case 'Episode':
          this.subscriptions.push(
            this.mediaInfoService
              .getTvShowEpisodeInfoById(this.mediaInfo.id)
              .subscribe(episode => {
                this.mediaViewLink += `${mediasLinks.tv_show_view.path}/${episode.tvShowId}`;
              })
          );
          break;
      }
    }
  }
  private loadMediaFileInfo() {
    if (this.mediaFile) {
      this.videoUrl = `${API_RESOURCE_URI.STREAMING}/${this.mediaId}/${this.mediaFile.filename}`;
      console.log(this.videoUrl);
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
          `${API_RESOURCE_URI.STREAMING}/${this.mediaId}/${audioTrack.filename}`
      );
      this.subtitleList = this.mediaFile.subtitles.map(
        (subtitleTrack, index) => {
          return {
            srcLang: subtitleTrack.language.toLowerCase(),
            url: `${API_RESOURCE_URI.STREAMING}/${this.mediaId}/${subtitleTrack.filename}`,
            default: index === 0,
          };
        }
      );
      this.currentAudio = this.audioList[0];
    }
  }

  onPlayerReady(api: VgApiService) {
    this.subscriptions.push(
      api
        .getDefaultMedia()
        .subscriptions.timeUpdate.pipe(
          throttleTime(5000, undefined, {
            leading: true,
          })
        )
        .subscribe(() =>
          this.streamUpdate.emit({
            watchStatus: StreamStatusEnum.PLAYING,
            stoppedAt: api.currentTime / api.duration,
          })
        )
    );
    this.subscriptions.push(
      api.getDefaultMedia().subscriptions.pause.subscribe(() =>
        this.streamUpdate.emit({
          watchStatus: StreamStatusEnum.STOPPED,
          stoppedAt: api.currentTime / api.duration,
        })
      )
    );
    this.subscriptions.push(
      api.getDefaultMedia().subscriptions.play.subscribe(() =>
        this.streamUpdate.emit({
          watchStatus: StreamStatusEnum.STARTED,
          stoppedAt: api.currentTime / api.duration,
        })
      )
    );
    this.subscriptions.push(
      api
        .getDefaultMedia()
        .subscriptions.ended.subscribe(() =>
          this.store.dispatch(new StreamingActions.MediaEndedPlaylist())
        )
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
