import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { BitrateOptions, VgApiService } from '@videogular/ngx-videogular/core';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resources-uri';
import { interval, Subject, takeUntil } from 'rxjs';
import { navigationRoot } from '../../../app-routing.module';
import { MediaInfoService } from '../../media-info/media-info.service';
import { mediasLinks } from '../../../pages/medias/medias-routing.module';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  mediaViewLink = `/${navigationRoot.medias.path}/`;

  @Input() mediaTitle = 'undefined';
  @Input() mediaId: number | undefined;
  @Input() mediaFile: MediaFile | undefined;
  @Input() timeSeek = 0;

  intervalId: any;
  componentDestroyed$ = new Subject();

  audioOptions: BitrateOptions[] = [];
  audioList: string[] = [];

  subtitleList: { srcLang: string; url: string; default: boolean }[] = [];

  videoUrl = '';
  currentAudio = '';

  constructor(private mediaInfoService: MediaInfoService) {}

  ngOnInit() {
    if (this.mediaId) {
      this.mediaInfoService.getMediaInfo(this.mediaId).subscribe(media => {
        switch (media.mediaType) {
          case 'Movie':
            this.mediaViewLink += `${mediasLinks.movie_view.path}/${this.mediaId}`;
            break;
          case 'Episode':
            this.mediaInfoService
              .getTvShowEpisodeInfoById(media.id)
              .subscribe(episode => {
                this.mediaViewLink += `${mediasLinks.tv_show_view.path}/${episode.tvShowId}`;
              });
            break;
        }
      });
    }

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

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  onPlayerReady(api: VgApiService) {
    this.intervalId = interval(5000)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        const totalSeconds = Math.floor(api.currentTime);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        console.log(
          `Position dans la vidéo ${minutes}:${
            seconds < 10 ? '0' : ''
          }${seconds}`
        );
      });

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
