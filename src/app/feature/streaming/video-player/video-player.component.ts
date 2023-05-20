import { Component, Input, OnInit } from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { BitrateOptions } from '@videogular/ngx-videogular/core';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resources-uri';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() mediaTitle = 'undefined';
  @Input() mediaId: number | undefined;
  @Input() mediaFile: MediaFile | undefined;

  audioOptions: BitrateOptions[] = [];
  audioList: string[] = [];

  subtitleList: { srcLang: string; url: string; default: boolean }[] = [];

  videoUrl = '';
  currentAudio = '';

  ngOnInit() {
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
}
