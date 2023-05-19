import { Component, Input, OnInit } from '@angular/core';
import { MediaFile } from '../../../shared/models/mdeia-file.model';
import { BitrateOptions } from '@videogular/ngx-videogular/core';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resources-uri';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() mediaId = 'undefined';
  @Input() mediaName = 'undefined';
  @Input() mediaFile: MediaFile | undefined;

  audioOptions: BitrateOptions[] = [];
  audioList: string[] = [];

  subtitleList: { label: string; url: string; default: boolean }[] = [];

  videoUrl = '';
  currentAudio = '';

  ngOnInit() {
    console.log(this.mediaId);
    console.log(this.mediaName);
    console.log(this.mediaFile);

    if (this.mediaFile) {
      this.videoUrl = `${API_RESOURCE_URI.STREAMING}/${this.mediaId}/${this.mediaFile.filename}`;
      this.audioOptions = this.mediaFile.audioTracks.map(
        (audioTrack, index) => {
          return {
            qualityIndex: index,
            width: 0,
            height: 0,
            bitrate: 0,
            mediaType: 'audio',
            label: audioTrack.language,
          };
        }
      );
      this.audioList = this.mediaFile.audioTracks.map(
        audioTrack =>
          `${API_RESOURCE_URI.STREAMING}/${this.mediaId}/${audioTrack.filename}`
      );
      this.subtitleList = this.mediaFile.subtitleTracks.map(
        (subtitleTrack, index) => {
          return {
            label: subtitleTrack.language,
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
}
