import { Component } from '@angular/core';
import { MediaFile } from '../../../shared/models/mdeia-file.model';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.less'],
})
export class StreamComponent {
  mediaId = '123456';
  mediaName = "La croix de Jesus (Oui, j'avais pas d'idées ...)";
  mediaFile: MediaFile = {
    filename: 'index.m3u8',
    duration: 1200,
    audioTracks: [
      {
        filename: 'audio_1.m3u8',
        language: 'JPN',
      },
    ],
    subtitleTracks: [
      {
        filename: 'subtitle_2.vtt',
        language: 'FRA',
      },
    ],
  };
}
